import { BrickUnit } from './units/brick.unit'
import { PlayerUnit } from './units/player/player.unit'
import { EnemyUnit } from './units/enemy/enemy.unit'
import { BombUnit } from './units/bomb/bomb.unit'
import { ThingUnit } from './units/thing/thing.unit'
import { MazeBuilder } from './maze-builder'

export class Playground {
  private readonly _mazeBuilder: MazeBuilder
  public enemies: EnemyUnit[] = []
  public bricks: BrickUnit[] = []
  public bombs: BombUnit[] = []
  public things: ThingUnit[] = []
  private _enemyMoveCommand: ((enemy: EnemyUnit) => void) | undefined

  constructor(mazeBuilder: MazeBuilder) {
    this._mazeBuilder = mazeBuilder
  }

  public setCommand(fn: (enemy: EnemyUnit) => void) {
    this._enemyMoveCommand = fn
  }

  public plantBomb(player: PlayerUnit) {
    const { pX, pY, bombPower } = player
    const bomb = this._mazeBuilder.addBomb(pX, pY, bombPower)

    if (!bomb) return

    this.bombs.push(bomb)
    return bomb
  }

  public endExplode(bomb: BombUnit) {
    const { bricks, things } = this._mazeBuilder.deleteBomb(bomb)
    this.bombs = this.bombs.filter(sBomb => sBomb !== bomb)
    this.bricks = bricks
    this.things = this.things.concat(things)
  }

  public start(player: PlayerUnit, level: number) {
    const { matrix, bricks, enemies } = this._mazeBuilder.buildMaze(
      player,
      level
    )

    this.bricks = bricks
    this.enemies = enemies
    this.things = []
    this.bombs = []

    if (this._enemyMoveCommand) {
      this.enemies.forEach(enemyUnit =>
        enemyUnit.onMove(this._enemyMoveCommand)
      )
    }
    return matrix
  }

  public draw(canvasCtx: CanvasRenderingContext2D, offsetX: number) {
    for (const unit of [
      ...this.bricks,
      ...this.things,
      ...this.bombs,
      ...this.enemies,
    ]) {
      unit.draw(canvasCtx, offsetX)
    }
  }
}
