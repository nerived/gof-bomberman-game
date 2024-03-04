import { BrickUnit } from './units/brick.unit'
import { PlayerUnit } from './units/player/player.unit'
import { EnemyUnit } from './units/enemy/enemy.unit'
import { BombUnit } from './units/bomb/bomb.unit'
import { ThingUnit } from './units/thing/thing.unit'
import { MazeBuilder } from './maze-builder'
import { ICommand } from './basics/command'

export class Playground {
  private readonly _mazeBuilder: MazeBuilder
  private readonly _player: PlayerUnit
  public enemies: EnemyUnit[] = []
  public bricks: BrickUnit[] = []
  public bombs: BombUnit[] = []
  public things: ThingUnit[] = []
  private _commandOnPlayerMove: ICommand | undefined

  constructor(player: PlayerUnit, mazeBuilder: MazeBuilder) {
    this._mazeBuilder = mazeBuilder
    this._player = player
  }

  public watchOnPlayer = () => {
    this._commandOnPlayerMove?.execute()
  }

  public setCommand(command: ICommand) {
    this._commandOnPlayerMove = command
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

  public start(level: number) {
    const { matrix, bricks, enemies } = this._mazeBuilder.buildMaze(
      this._player,
      level
    )
    this._player.setLevelMatrix(matrix)
    this._player.start()
    this.bricks = bricks
    this.enemies = enemies
    this.things = []
    this.bombs = []
  }

  public draw(canvasCtx: CanvasRenderingContext2D, offsetX: number) {
    for (const unit of [
      ...this.bricks,
      ...this.things,
      ...this.bombs,
      ...this.enemies,
      this._player,
    ]) {
      unit.draw(canvasCtx, offsetX)
    }
  }
}
