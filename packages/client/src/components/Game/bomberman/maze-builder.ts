import { RectGameUnit } from './basics/unit'
import { WallUnit } from './units/wall.unit'
import { PassageUnit } from './units/passage.unit'
import { BrickUnit } from './units/brick.unit'
import { PlayerUnit } from './units/player/player.unit'
import { EnemyUnit } from './units/enemy.unit'
import { BombUnit } from './units/bomb/bomb.unit'
import { ThingUnit } from './units/thing.unit'
import { DoorUnit } from './units/door.unit'

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

interface TContext {
  pixelRatio: number
  tileSize: number
  mazeLines: number
  mazeColumns: number
}

export class MazeBuilder {
  private _maze: Array<RectGameUnit[]> = [[]]
  private _tileSize: number
  private _pixelRatio: number
  private _mazeLines: number
  private _mazeColumns: number

  constructor(context: TContext) {
    this._pixelRatio = context.pixelRatio
    this._tileSize = context.tileSize
    this._mazeLines = context.mazeLines
    this._mazeColumns = context.mazeColumns
  }

  private _computePosFor(coordinate: number) {
    return Math.trunc(coordinate / this._tileSize)
  }

  public buildMaze(player: PlayerUnit, level = 1) {
    const matrix: Array<RectGameUnit[]> = Array(this._mazeLines)
      .fill(null)
      .map(() => Array(this._mazeColumns))

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
          matrix[i][j] = new PassageUnit(x, y)
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
          enemies.push(
            new EnemyUnit(this._pixelRatio, x, y, this._tileSize * 0.5)
          )
          matrix[i][j] = new PassageUnit(x, y)
        }
      }
    }

    this._maze = matrix

    return { matrix, bricks, enemies }
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

        if (!unit.destroyable) break

        bomb.magnitude.push(unit)

        unit instanceof BombUnit && unit.magnitude.push(bomb)

        if (!unit.passable) break

        curPower--
      }
    }
  }

  private _collectStaticUnits() {
    const bricks = []
    const things = []
    const doors = []

    for (let i = 0; i < this._maze.length; i++) {
      for (let j = 0; j < this._maze[i].length; j++) {
        const unit = this._maze[i][j]

        if (unit instanceof BrickUnit) {
          bricks.push(unit)
        }

        if (unit instanceof ThingUnit) {
          things.push(unit)
        }

        if (unit instanceof DoorUnit) {
          doors.push(unit)
        }
      }
    }

    return { bricks, things, doors }
  }

  public addBomb(x: number, y: number, power: number) {
    const cX = x
    const cY = y

    const posX = this._computePosFor(cX)
    const posY = this._computePosFor(cY)

    if (this._maze[posY][posX] instanceof BombUnit) return

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
    const { x, y, magnitude } = bomb
    const posX = this._computePosFor(x)
    const posY = this._computePosFor(y)

    this._maze[posY][posX] = new PassageUnit(
      x,
      y,
      this._tileSize,
      this._tileSize
    )

    magnitude.forEach(unit => {
      const { x, y } = unit
      const posX = this._computePosFor(x)
      const posY = this._computePosFor(y)

      if (unit instanceof BrickUnit) {
        this._maze[posY][posX] = new PassageUnit(
          x,
          y,
          this._tileSize,
          this._tileSize
        )
        return
      }
    })

    return this._collectStaticUnits()
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
    '#-$$----$$$$-------------@--------#',
    '#-#$#-#-#-#$#$#-#-#-#-#-#-#-#-#-#-#',
    '#----$--------$$----$$------------#',
    '#-#-#-#-#-#$#-#-#-#$#$#-#-#-#-#-#-#',
    '#%------$$$$------@---------------#',
    '#-#-#$#-#-#$#-#-#-#-#-#-#-#-#-#-#-#',
    '#----$-------$$----------@-$$$$$--#',
    '#-#-#-#$#-#-#$#-#-#-#-#-#-#-#-#$#-#',
    '#--$-------$$$---@---$$$-------$$$#',
    '#-#$#-#-#$#-#-#-#-#-#-#$#-#-#-#-#-#',
    '#--@---$$$-----@-------$$$--@-----#',
    '###################################',
  ],
]
