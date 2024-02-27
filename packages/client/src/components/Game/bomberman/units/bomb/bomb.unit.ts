import { RectGameUnit, TGameUnit } from '../../basics/unit'
import { ICommand } from '../../basics/command'
import { STATE, BombState } from './bomb.state'

export class BombUnit extends RectGameUnit {
  public passable = true
  public destroyable = true
  public readonly power
  public magnitude: TGameUnit[] = []
  public exploded = false
  public command: ICommand | undefined
  private _state: BombState = new STATE.IDLE(this)

  constructor(power: number, x = 0, y = 0, width = 0, height = 0) {
    super(x, y, width, height)

    this.power = power
  }

  public setToImpassable() {
    this.passable = false
  }

  public detonate() {
    this.exploded = true
  }

  public changeState(state: BombState) {
    this._state = state
  }

  public setCommand(command: ICommand) {
    this.command = command
  }

  public draw(canvasCtx: CanvasRenderingContext2D, offsetX: number) {
    this._state.draw(canvasCtx, offsetX)
  }
}
