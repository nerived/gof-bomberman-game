import { circleVsRectCollision, circleVsCircleCollision } from './_lib'
import { ExplodeBomb } from './commands/explode-bomb'
import { DeleteBomb } from './commands/delete-bomb'
import { BrickUnit } from './units/brick.unit'
import { PlayerUnit } from './units/player/player.unit'
import { EnemyUnit } from './units/enemy.unit'
import { BombUnit } from './units/bomb/bomb.unit'
import { THING_TYPE, ThingUnit } from './units/thing/thing.unit'
import { MazeBuilder } from './maze-builder'
import { Mechanics } from './mechanics'
import { ICommand } from './basics/command'

export class Playground {
  private readonly _mazeBuilder: MazeBuilder
  private readonly _player: PlayerUnit
  private readonly _mechanics: Mechanics
  private _enemies: EnemyUnit[] = []
  private _bricks: BrickUnit[] = []
  private _bombs: BombUnit[] = []
  private _things: ThingUnit[] = []
  private _command: ICommand | undefined

  constructor(
    player: PlayerUnit,
    mazeBuilder: MazeBuilder,
    mechanics: Mechanics
  ) {
    this._mazeBuilder = mazeBuilder
    this._player = player
    this._mechanics = mechanics
  }

  private _switchBombToImpassable = (bomb: BombUnit) => {
    !(
      this._player.getRight() > bomb.getLeft() &&
      this._player.getLeft() < bomb.getRight() &&
      this._player.getBottom() > bomb.getTop() &&
      this._player.getTop() < bomb.getBottom()
    ) && bomb.setToImpassable()
  }

  private _doPlayerCollideLogicWithThings() {
    for (const thing of this._things) {
      if (circleVsRectCollision(this._player, thing, 0.1).isOverlap) {
        if (thing.getThingType() === THING_TYPE.DOOR) {
          this._enemies.length === 0 && alert('level complete')
        }

        thing.getThingType() === THING_TYPE.AMMO && this._player.bombAmmo++
        thing.getThingType() === THING_TYPE.POWER && this._player.bombPower++
        thing.getThingType() === THING_TYPE.LIFE && this._mechanics.plusLife()

        this._things = this._things.filter(
          sThing =>
            sThing.getThingType() !== THING_TYPE.DOOR && sThing !== thing
        )
      }
    }
  }

  private _doPlayerCollideLogicWithEnemies() {
    for (const enemy of this._enemies) {
      if (!circleVsCircleCollision(this._player, enemy, 0.8)) continue
      this._mechanics.minusLife()
      return
    }
  }

  private _doPlayerCollideLogicWithFlame() {
    for (const bomb of this._bombs) {
      if (!bomb.exploded) continue

      for (const flame of bomb.magnitude) {
        const { isOverlap } = circleVsRectCollision(this._player, flame, 0.4)
        if (!isOverlap) continue
        this._mechanics.minusLife()
        return
      }
    }
  }

  public watchOnPlayer = () => {
    this._command?.execute()
    this._bombs.forEach(this._switchBombToImpassable)

    this._doPlayerCollideLogicWithFlame()
    this._doPlayerCollideLogicWithThings()
    this._doPlayerCollideLogicWithEnemies()
  }

  public setCommand(command: ICommand) {
    this._command = command
  }

  public plantBomb() {
    const { pX, pY, bombPower } = this._player
    const bomb = this._mazeBuilder.addBomb(pX, pY, bombPower)

    if (!bomb) return

    this._bombs.push(bomb)
    this._player.bombAmmo--
    bomb.setCommand(new ExplodeBomb(this, bomb))
  }

  public startExplode(bomb: BombUnit) {
    bomb.magnitude.forEach(unitInExplode => {
      let adjacentBomb: BombUnit | undefined
      if (unitInExplode instanceof BombUnit) {
        adjacentBomb = unitInExplode
      }
      adjacentBomb && adjacentBomb.detonate()
    })

    this._doPlayerCollideLogicWithFlame()

    bomb.setCommand(new DeleteBomb(this, bomb))
  }

  public endExplode(bomb: BombUnit) {
    this._player.bombAmmo++
    const { bricks, things } = this._mazeBuilder.deleteBomb(bomb)
    this._bombs = this._bombs.filter(sBomb => sBomb !== bomb)
    this._bricks = bricks
    this._things = this._things.concat(things)
  }

  public start(level: number) {
    const { matrix, bricks, enemies } = this._mazeBuilder.buildMaze(
      this._player,
      level
    )
    this._player.setLevelMatrix(matrix)
    this._player.start()
    this._mechanics.start()
    this._bricks = bricks
    this._enemies = enemies
    this._things = []
    this._bombs = []
  }

  public draw(canvasCtx: CanvasRenderingContext2D, offsetX: number) {
    ;[
      ...this._bricks,
      ...this._things,
      ...this._bombs,
      ...this._enemies,
    ].forEach(unit => {
      unit.draw(canvasCtx, offsetX)
    })

    this._player.draw(canvasCtx, offsetX)
  }
}
