import { RectGameUnit, TGameUnit } from '../../basics/unit'
import { ICommand } from '../../basics/command'
import { STATE, BombState } from './bomb.state'
import bombImageSrc from '../../assets/bomb-sprite.png'

export const SPRITE_SIZE = 112

export const SPRITE_INDEX = {
  IDLE: { posY: 0, frames: 8, throttle: 8 },
  EXPLODE: { posY: 1, frames: 15, throttle: 4 },
}

export class BombUnit extends RectGameUnit {
  public image
  public passable = true
  public destroyable = true
  public readonly power
  public magnitude: TGameUnit[] = []
  public startExplode = false
  public exploded = false
  public command: ICommand | undefined
  private _state: BombState = new STATE.IDLE(this)

  constructor(power: number, x = 0, y = 0, width = 0, height = 0) {
    super(x, y, width, height)

    this.image = new Image()
    this.image.src = bombImageSrc

    this.power = power
    this.magnitude.push(this)
  }

  public setToImpassable() {
    this.passable = false
  }

  public detonate() {
    this.startExplode = true
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
