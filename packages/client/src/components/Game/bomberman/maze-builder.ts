import { WallUnit } from './units/wall.unit'
import { PassageUnit } from './units/passage.unit'
import { BrickUnit } from './units/brick.unit'
import { PlayerUnit } from './units/player/player.unit'
import { EnemyUnit } from './units/enemy/enemy.unit'
import { BombUnit } from './units/bomb/bomb.unit'
import { THING_TYPE, ThingUnit } from './units/thing/thing.unit'
import { ClassicStrategy } from './units/enemy/classic.strategy'
import { Matrix } from './matrix'

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
  unitVelocity: number
}

export class MazeBuilder {
  private _maze = new Matrix()
  private _context: TGameContext
  private _tileSize: number

  constructor(context: TGameContext) {
    this._context = context
    this._tileSize = context.tileSize
  }

  private _computePosFor(coordinate: number) {
    return (coordinate / this._tileSize) << 0
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
    level = 1

    const { mazeLines, mazeColumns } = this._context
    const matrix = new Matrix(mazeLines, mazeColumns)

    const enemies: EnemyUnit[] = []
    const bricks: BrickUnit[] = []

    for (let posY = 0; posY < matrix.getLenY(); ++posY) {
      for (let posX = 0; posX < matrix.getLenX(); ++posX) {
        const tileType = LEVEL[level][posY][posX]
        const x = this._tileSize * posX
        const y = this._tileSize * posY
        const width = this._tileSize
        const height = this._tileSize
        const radius = this._tileSize * 0.5

        if (tileType === TILE_TYPE.PLAYER) {
          player.radius = radius
          player.x = x
          player.y = y
          matrix.setIn(posY, posX, new PassageUnit(x, y, width, height))
        }

        if (tileType === TILE_TYPE.PASSAGE) {
          matrix.setIn(posY, posX, new PassageUnit(x, y, width, height))
        }

        if (tileType === TILE_TYPE.WALL) {
          matrix.setIn(posY, posX, new WallUnit(x, y, width, height))
        }

        if (tileType === TILE_TYPE.BRICK) {
          const brickUnit = new BrickUnit(x, y, width, height)
          matrix.setIn(posY, posX, brickUnit)
          bricks.push(brickUnit)
        }

        if (tileType === TILE_TYPE.ENEMY) {
          matrix.setIn(posY, posX, new PassageUnit(x, y, width, height))

          const enemy = new EnemyUnit(
            this._context,
            x,
            y,
            radius,
            matrix,
            'DRAGON'
          )
          enemy.setStrategy(new ClassicStrategy(enemy))
          enemies.push(enemy)
        }
      }
    }

    this._putThings(bricks)

    this._maze = matrix

    return { matrix, bricks, enemies }
  }

  private _getBricks() {
    const bricks = []

    for (let posY = 0; posY < this._maze.getLenY(); posY++) {
      for (let posX = 0; posX < this._maze.getLenX(); posX++) {
        const unit = this._maze.getIn(posY, posX)

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

        const unit = this._maze.getIn(curPosY, curPosX)

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

    const unitInCurPos = this._maze.getIn(posY, posX)

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

    this._maze.setIn(posY, posX, bomb)

    this._computeBombMagnitude(bomb, power, posX, posY)

    return bomb
  }

  public deleteBomb(bomb: BombUnit) {
    const { magnitude } = bomb

    const things: ThingUnit[] = []

    for (const unit of magnitude) {
      const posX = this._computePosFor(unit.x)
      const posY = this._computePosFor(unit.y)

      this._maze.setIn(
        posY,
        posX,
        new PassageUnit(unit.x, unit.y, this._tileSize, this._tileSize)
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
    '#----$-@--$-----------------------#',
    '#-#-#-#-#$#-#-#-#-#-#-#-#-#-#-#-#-#',
    '#------$--------------------------#',
    '#-#-#-#-#-#-#$#-#-#-#-#-#-#-#-#-#-#',
    '#---------------------------------#',
    '#%#-#-#-#-#-#$#-#-#-#-#-#-#-#-#-#-#',
    '#---------------------------------#',
    '#-#-#-#-#-#-#$#-#-#-#-#-#-#-#-#-#-#',
    '#---------------------------------#',
    '#-#-#-#-#-#-#$#-#-#-#-#-#-#-#-#-#-#',
    '#------------$--------------------#',
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
    '#$-----$$$---$---------$$$--@-----#',
    '###################################',
  ],
]
