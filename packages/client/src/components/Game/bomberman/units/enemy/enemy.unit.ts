import { CircleGameUnit } from '../../basics/unit'
import { IEnemyState, TStateIndex } from './state'
import { OCTOPUS } from './octopus.state'
import { EnemyStrategy } from './strategy'
import { Matrix } from '../../matrix'
import blueOctopusImageSrc from '../../assets/blue-octopus-sprite.png'
import purpleOctopusImageSrc from '../../assets/purple-octopus-sprite.png'
import { ICommand } from '../../basics/command'

export const ENEMY = {
  OCTOPUS: 'OCTOPUS',
} as const

export const EnemyState = {
  IDLE: 'IDLE',
  RIGHT: 'RIGHT',
  LEFT: 'LEFT',
  UP: 'UP',
  DOWN: 'DOWN',
  DEAD: 'DEAD',
} as const

const ENEMY_IMAGE = {
  get OCTOPUS() {
    return [blueOctopusImageSrc, purpleOctopusImageSrc][
      Math.trunc(Math.random() * 2)
    ]
  },
}

const ENEMY_TYPE = {
  OCTOPUS,
} as const

interface TGameContext {
  unitVelocity: number
}

type TEnemyStateUnion = keyof typeof EnemyState

export class EnemyUnit extends CircleGameUnit {
  public image
  public passable = true
  public destroyable = false
  public velocity: number
  public levelMatrix: Matrix
  public state: TEnemyStateUnion
  public onMoveCommand?: () => void
  public onDeadCommand?: ICommand
  private _states: TStateIndex
  private _curState: IEnemyState
  private _strategy?: EnemyStrategy

  constructor(
    context: TGameContext,
    x: number,
    y: number,
    radius: number,
    levelMatrix: Matrix,
    type: keyof typeof ENEMY_TYPE
  ) {
    super(x, y, radius)
    this.velocity = context.unitVelocity
    this.levelMatrix = levelMatrix
    this.state = EnemyState.IDLE
    this._states = ENEMY_TYPE[type]
    this._curState = new ENEMY_TYPE[type].IDLE(this)
    this.image = new Image()
    this.image.src = ENEMY_IMAGE[type]
  }

  public onMove(fn?: () => void) {
    this.onMoveCommand = fn
  }

  public onDead(command: ICommand) {
    this.onDeadCommand = command
  }

  public getCurPos() {
    const titleSize = this.levelMatrix.getTileSize()
    const curPosX = (this.pX / titleSize) << 0
    const curPosY = (this.pY / titleSize) << 0
    return { curPosX, curPosY }
  }

  public getScore() {
    return this._curState.getScore()
  }

  public setStrategy(strategy: EnemyStrategy) {
    this._strategy = strategy
  }

  public setState(newState: TEnemyStateUnion) {
    this._curState = new this._states[newState](this)
    this.state = newState
  }

  public draw(canvasCtx: CanvasRenderingContext2D, offsetX: number): void {
    this._strategy?.doMovingAlgorithm()
    this._curState.draw(canvasCtx, offsetX)
  }
}
