import { ICommand } from '../../basics/command'
import { CircleGameUnit } from '../../basics/unit'
import { PlayerState, STATE } from './player.state'

const playerImageSrc = '/src/components/Game/bomberman/assets/player.png'

interface TContext {
  pixelRatio: number
}

type TLevelMatrix = Array<
  Array<{
    x: number
    y: number
    width: number
    height: number
    passable: boolean
  }>
>

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
  public command: ICommand | undefined
  public levelMatrix: TLevelMatrix = [[]]

  constructor(protected readonly context: TContext) {
    super()
    this._image = new Image()
    this._image.src = playerImageSrc
    this.maxVelocity = 4 * context.pixelRatio
  }

  public onMove?: () => void

  public setLevelMatrix(levelMatrix: TLevelMatrix) {
    this.levelMatrix = levelMatrix
  }

  public setCommand(cmd: ICommand) {
    this.command = cmd
  }

  public action = (actions: TAction[]) => {
    this._curState = actions.map(action => this._stateList[STATE_INDEX[action]])
  }

  public start() {
    this._curState = [this._stateList[STATE_INDEX.IDLE]]
    // debug ammo 100
    this.bombAmmo = 100
    this.bombPower = 1
  }

  public draw(canvasCtx: CanvasRenderingContext2D, offsetX: number): void {
    this._curState.forEach(state => state.useAction())

    // debug circle >>>
    canvasCtx.beginPath()
    canvasCtx.arc(this.pX + offsetX, this.pY, this.radius, 0, 2 * Math.PI)
    canvasCtx.strokeStyle = 'magenta'
    canvasCtx.fillStyle = 'rgba(200 200 200 / 30%)'
    canvasCtx.stroke()
    canvasCtx.fill()
    // <<< debug circle

    canvasCtx.drawImage(this._image, this.x + offsetX, this.y)
  }
}
