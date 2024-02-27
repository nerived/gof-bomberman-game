import { RectGameUnit } from './basics/unit'
import { WallUnit } from './units/wall.unit'
import { PassageUnit } from './units/passage.unit'
import { BrickUnit } from './units/brick.unit'
import { PlayerUnit } from './units/player/player.unit'
import { EnemyUnit } from './units/enemy.unit'
import { BombUnit } from './units/bomb/bomb.unit'
import { THING_TYPE, ThingUnit } from './units/thing/thing.unit'

const TILE_TYPE = {
  PLAYER: '%',
  PASSAGE: '-',
  WALL: '#',
  BRICK: '$',
  ENEMY: '@',
}

const explodeDirections = [
  { x: -1, y: 0 },
  { x: 1, y: 0 },
  { x: 0, y: -1 },
  { x: 0, y: 1 },
]

interface TGameContext {
  pixelRatio: number
  tileSize: number
  mazeLines: number
  mazeColumns: number
}

export class MazeBuilder {
  private _maze: Array<RectGameUnit[]> = [[]]
  private _context: TGameContext
  private _tileSize: number

  constructor(context: TGameContext) {
    this._context = context
    this._tileSize = context.tileSize
  }

  private _computePosFor(coordinate: number) {
    return Math.trunc(coordinate / this._tileSize)
  }

  private _putThings(bricks: BrickUnit[]) {
    let remains: THING_TYPE[] = [
      THING_TYPE.DOOR,
      THING_TYPE.POWER,
      THING_TYPE.LIFE,
      THING_TYPE.AMMO,
    ]

    while (remains.length) {
      const thingIdx = Math.floor(Math.random() * remains.length)
      const thingType = remains[thingIdx]

      remains = remains.filter(sThing => sThing !== thingType)

      let listIdx = 0
      for (;;) {
        if (Math.trunc(Math.random() * 10000) > 2) {
          listIdx = (listIdx + 1) % bricks.length
          continue
        }

        const brick = bricks[listIdx]
        const { x, y, width, height } = brick
        const thing = new ThingUnit(thingType, x, y, width, height)
        brick.queue.enqueue(thing)
        break
      }
    }

    return bricks
  }

  public buildMaze(player: PlayerUnit, level = 1) {
    const matrix: Array<RectGameUnit[]> = Array(this._context.mazeLines)
      .fill(null)
      .map(() => Array(this._context.mazeColumns))

    const enemies: EnemyUnit[] = []
    const bricks: BrickUnit[] = []

    for (let i = 0; i < matrix.length; ++i) {
      for (let j = 0; j < matrix[i].length; ++j) {
        const tileType = LEVEL[level][i][j]
        const x = this._tileSize * j
        const y = this._tileSize * i
        const width = this._tileSize
        const height = this._tileSize

        if (tileType === TILE_TYPE.PLAYER) {
          player.radius = this._tileSize * 0.5
          player.x = x
          player.y = y
          matrix[i][j] = new PassageUnit(x, y, width, height)
        }

        if (tileType === TILE_TYPE.PASSAGE) {
          matrix[i][j] = new PassageUnit(x, y, width, height)
        }

        if (tileType === TILE_TYPE.WALL) {
          matrix[i][j] = new WallUnit(x, y, width, height)
        }

        if (tileType === TILE_TYPE.BRICK) {
          const brickUnit = new BrickUnit(x, y, width, height)

          matrix[i][j] = brickUnit
          bricks.push(brickUnit)
        }

        if (tileType === TILE_TYPE.ENEMY) {
          enemies.push(new EnemyUnit(this._context, x, y, this._tileSize * 0.5))
          matrix[i][j] = new PassageUnit(x, y, width, height)
        }
      }
    }

    this._putThings(bricks)

    this._maze = matrix

    return { matrix, bricks, enemies }
  }

  private _getBricks() {
    const bricks = []

    for (let i = 0; i < this._maze.length; i++) {
      for (let j = 0; j < this._maze[i].length; j++) {
        const unit = this._maze[i][j]

        if (unit instanceof BrickUnit) {
          bricks.push(unit)
        }
      }
    }

    return bricks
  }

  private _computeBombMagnitude(
    bomb: BombUnit,
    power: number,
    posX: number,
    posY: number
  ) {
    for (let i = 0; i < explodeDirections.length; i++) {
      let curPower = power
      let curPosX = posX
      let curPosY = posY

      while (curPower > 0) {
        curPosX += explodeDirections[i].x
        curPosY += explodeDirections[i].y

        const unit = this._maze[curPosY]?.[curPosX]

        if (unit instanceof WallUnit) break

        bomb.magnitude.push(unit)

        unit instanceof BombUnit && unit.magnitude.push(bomb)

        if (!unit.passable) break

        curPower--
      }
    }
  }

  public addBomb(x: number, y: number, power: number) {
    const cX = x
    const cY = y

    const posX = this._computePosFor(cX)
    const posY = this._computePosFor(cY)

    const unitInCurPos = this._maze[posY][posX]

    if (unitInCurPos instanceof BombUnit || unitInCurPos instanceof ThingUnit) {
      return
    }

    const bomb = new BombUnit(
      power,
      posX * this._tileSize,
      posY * this._tileSize,
      this._tileSize,
      this._tileSize
    )

    this._maze[posY][posX] = bomb

    this._computeBombMagnitude(bomb, power, posX, posY)

    return bomb
  }

  public deleteBomb(bomb: BombUnit) {
    const { magnitude } = bomb

    const things: ThingUnit[] = []

    for (const unit of magnitude) {
      const { x, y } = unit
      const posX = this._computePosFor(x)
      const posY = this._computePosFor(y)

      this._maze[posY][posX] = new PassageUnit(
        x,
        y,
        this._tileSize,
        this._tileSize
      )

      if (unit instanceof BrickUnit && unit.queue.size) {
        const potentialThing = unit.queue.dequeue()
        potentialThing instanceof ThingUnit && things.push(potentialThing)
      }
    }

    return { bricks: this._getBricks(), things }
  }
}

const LEVEL = [
  [
    '###################################',
    '#---------------------------------#',
    '#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#',
    '#---------------------------------#',
    '#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#',
    '#---------------------------------#',
    '#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#',
    '#---------------------------------#',
    '#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#',
    '#---------------------------------#',
    '#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#-#',
    '#---------------------------------#',
    '###################################',
  ],
  [
    '###################################',
    '#$$$-----$$$-------$$----@------$$#',
    '#-#$#$#-#-#$#$#$#$#$#$#-#-#-#$#-#$#',
    '#---$$---$$---$$----$$------$$----#',
    '#-#$#@#$#-#$#-#$#-#$#$#$#-#-#$#-#-#',
    '#%-$-----$$$---$--@-----$----$$---#',
    '#-#-#$#-#$#$#$#-#-#$#-#-#-#-#-#-#-#',
    '#---$$$$-$--$$$----$-----@-$$$$$--#',
    '#-#-#$#$#$#-#$#-#-#-#-#-#-#-#-#$#-#',
    '#$$$---$$$$--$$--@--$$$$----$--$$$#',
    '#$#$#-#$#$#-#$#$#$#-#-#$#-#-#-#$#$#',
    '#$-@---$$$---$-@-------$$$--@-----#',
    '###################################',
  ],
]
