import { ICommand } from '../../basics/command'
import { CircleGameUnit } from '../../basics/unit'
import { PlayerState, STATE } from './player.state'
import { Matrix } from '../../matrix'
import playerImageSrc from '../../assets/player-sprite.png'

export const SPRITE_SIZE = 112

export const SPRITE_INDEX = {
  IDLE: { posY: 0, frames: 1, throttle: 1 },
  RIGHT: { posY: 1, frames: 4, throttle: 6 },
  LEFT: { posY: 2, frames: 4, throttle: 6 },
  UP: { posY: 3, frames: 4, throttle: 6 },
  DOWN: { posY: 4, frames: 4, throttle: 6 },
  BOMB: { posY: 5, frames: 1, throttle: 1 },
}

interface TGameContext {
  unitVelocity: number
}

const STATE_INDEX = {
  IDLE: 0,
  LEFT: 1,
  RIGHT: 2,
  UP: 3,
  DOWN: 4,
  BOMB: 5,
}

export type TAction = keyof Omit<typeof STATE_INDEX, 'IDLE'>

export class PlayerUnit extends CircleGameUnit {
  public image: HTMLImageElement

  public passable = true
  public destroyable = false
  public maxVelocity: number
  public ammo = 1
  public maxAmmo = 1
  public bombPower = 1

  private _stateList = [
    new STATE.IDLE(this),
    new STATE.LEFT(this),
    new STATE.RIGHT(this),
    new STATE.UP(this),
    new STATE.DOWN(this),
    new STATE.BOMB(this),
  ]

  private _curState: PlayerState[] = [this._stateList[STATE_INDEX.IDLE]]
  public plantBombCommand: ICommand | undefined
  public moveCommand: ICommand | undefined
  public levelMatrix = new Matrix()

  constructor(protected readonly context: TGameContext) {
    super(0, 0, 0)
    this.image = new Image()
    this.image.src = playerImageSrc
    this.maxVelocity = context.unitVelocity
  }

  public setLevelMatrix(levelMatrix: Matrix) {
    this.levelMatrix = levelMatrix
  }

  public onPlantBomb(cmd: ICommand) {
    this.plantBombCommand = cmd
  }

  public onMove(cmd: ICommand) {
    this.moveCommand = cmd
  }

  public action = (actions: TAction[]) => {
    this._curState = actions.map(action => this._stateList[STATE_INDEX[action]])

    this._curState.length === 0 &&
      this._curState.push(this._stateList[STATE_INDEX.IDLE])
  }

  public init() {
    this.ammo = this.maxAmmo
    this._curState = [this._stateList[STATE_INDEX.IDLE]]
  }

  public reset() {
    this.maxAmmo = 1
    this.bombPower = 1
    this.init()
  }

  public draw(canvasCtx: CanvasRenderingContext2D, offsetX: number): void {
    this._curState.forEach(state => state.useAction())

    const lastState = this._curState[this._curState.length - 1]
    lastState.draw(canvasCtx, offsetX)
  }
}
