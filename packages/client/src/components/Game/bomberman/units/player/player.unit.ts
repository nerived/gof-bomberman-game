import { ICommand } from '../../basics/command'
import { CircleGameUnit } from '../../basics/unit'
import { PlayerState, STATE } from './player.state'
import playerImageSrc from '../../assets/player.png'
import { Matrix } from '../../matrix'

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
  private _image: HTMLImageElement

  public passable = true
  public destroyable = false
  public maxVelocity: number
  public bombAmmo = 1
  public bombPower = 1

  private _stateList = [
    new STATE.IDLE(this),
    new STATE.LEFT(this),
    new STATE.RIGHT(this),
    new STATE.UP(this),
    new STATE.DOWN(this),
    new STATE.BOMB(this),
  ]

  private _curState: PlayerState[] = []
  public plantBombCommand: ICommand | undefined
  public moveCommand: ICommand | undefined
  public levelMatrix = new Matrix()

  constructor(protected readonly context: TGameContext) {
    super(0, 0, 0)
    this._image = new Image()
    this._image.src = playerImageSrc
    this.maxVelocity = context.unitVelocity * 2
  }

  public setLevelMatrix(levelMatrix: Matrix) {
    this.levelMatrix = levelMatrix
  }

  public setCommandOnPlantBomb(cmd: ICommand) {
    this.plantBombCommand = cmd
  }

  public setCommandOnMove(cmd: ICommand) {
    this.moveCommand = cmd
  }

  public action = (actions: TAction[]) => {
    this._curState = actions.map(action => this._stateList[STATE_INDEX[action]])
  }

  public start() {
    this._curState = [this._stateList[STATE_INDEX.IDLE]]
    this.bombAmmo = 10
    this.bombPower = 1
  }

  public draw(canvasCtx: CanvasRenderingContext2D, offsetX: number): void {
    this._curState.forEach(state => state.useAction())

    //debug circle >>>
    canvasCtx.beginPath()
    canvasCtx.arc(this.pX + offsetX, this.pY, this.radius, 0, 2 * Math.PI)
    canvasCtx.strokeStyle = 'magenta'
    canvasCtx.fillStyle = 'rgba(200 200 200 / 30%)'
    canvasCtx.stroke()
    canvasCtx.fill()
    //<<<debug circle

    canvasCtx.drawImage(
      this._image,
      this.x + offsetX,
      this.y,
      this.radius * 2,
      this.radius * 2
    )
  }
}
