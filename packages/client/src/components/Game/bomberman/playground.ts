import { circleVsCircleCollision } from './_lib'
import { ExplodeBomb } from './commands/explode-bomb'
import { DeleteBomb } from './commands/delete-bomb'
import { BrickUnit } from './units/brick.unit'
import { PlayerUnit } from './units/player/player.unit'
import { EnemyUnit } from './units/enemy.unit'
import { BombUnit } from './units/bomb/bomb.unit'
import { ThingUnit } from './units/thing.unit'
import { DoorUnit } from './units/door.unit'
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
  private _doors: DoorUnit[] = []
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

  private _switchBobmToImpassable = (bomb: BombUnit) => {
    this._player.getRight() <= bomb.getLeft() && bomb.setToImpassable()
    this._player.getLeft() >= bomb.getRight() && bomb.setToImpassable()
    this._player.getBottom() <= bomb.getTop() && bomb.setToImpassable()
    this._player.getTop() >= bomb.getBottom() && bomb.setToImpassable()
  }

  public watchOnPlayer = () => {
    this._command?.execute()
    this._bombs.forEach(this._switchBobmToImpassable)

    //TO DO detect collision with:
    // Flame
    // Thing
    // Doors

    this._enemies.forEach(enemy => {
      if (circleVsCircleCollision(this._player, enemy, 0.8)) {
        this._mechanics.minusLife()
      }
    })
  }

  public setComand(command: ICommand) {
    this._command = command
  }

  public plantBomb() {
    const { pX, pY, bombPower } = this._player
    const bomb = this._mazeBuilder.addBomb(pX, pY, bombPower)

    if (!bomb) return

    this._bombs.push(bomb)
    this._player.bombAmmo--
    bomb.setCommand(new ExplodeBomb(this, bomb))
    this._bombs.push(bomb)
  }

  public startExplode(bomb: BombUnit) {
    bomb.magnitude.forEach(unitInExplode => {
      let adjacentBomb: BombUnit | undefined
      if (unitInExplode instanceof BombUnit) {
        adjacentBomb = unitInExplode
      }
      adjacentBomb && adjacentBomb.detonate()
    })

    //TO DO check player and enemies collision with bomb flame

    bomb.setCommand(new DeleteBomb(this, bomb))
  }

  public endExplode(bomb: BombUnit) {
    this._player.bombAmmo++
    const { bricks, doors, things } = this._mazeBuilder.deleteBomb(bomb)
    this._bombs = this._bombs.filter(sBomb => sBomb !== bomb)
    this._bricks = bricks
    this._doors = doors
    this._things = things
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
  }

  public draw(canvasCtx: CanvasRenderingContext2D, offsetX: number) {
    ;[
      ...this._bricks,
      ...this._things,
      ...this._doors,
      ...this._bombs,
      ...this._enemies,
    ].forEach(unit => {
      unit.draw(canvasCtx, offsetX)
    })

    this._player.draw(canvasCtx, offsetX)
  }
}
