import { CircleGameUnit } from '../../basics/unit'
import { TLevelMatrix } from '../../_lib'
import { IEnemyState, TStateIndex } from './state'
import { DRAGON } from './dragon.state'
import { EnemyStrategy } from './strategy'

export const EnemyState = {
  IDLE: 'IDLE',
  LEFT: 'LEFT',
  RIGHT: 'RIGHT',
  UP: 'UP',
  DOWN: 'DOWN',
} as const

const ENEMY_TYPE = {
  DRAGON,
} as const

interface TGameContext {
  unitVelocity: number
}

export class EnemyUnit extends CircleGameUnit {
  public passable = true
  public destroyable = false
  public velocity: number
  public levelMatrix: TLevelMatrix
  public state: keyof typeof EnemyState
  private _stdVelocity: number
  private _states: TStateIndex
  private _curState: IEnemyState
  private _strategy?: EnemyStrategy

  constructor(
    context: TGameContext,
    x: number,
    y: number,
    radius: number,
    levelMatrix: TLevelMatrix,
    type: keyof typeof ENEMY_TYPE
  ) {
    super(x, y, radius)
    this._stdVelocity = context.unitVelocity
    this.velocity = this._stdVelocity
    this.levelMatrix = levelMatrix
    this.state = EnemyState.IDLE
    this._states = ENEMY_TYPE[type]
    this._curState = new ENEMY_TYPE[type].IDLE(this)
  }

  public onMove?: () => void

  public setStrategy(strategy: EnemyStrategy) {
    this._strategy = strategy
  }

  public setState(newState: keyof typeof EnemyState) {
    this._curState = new this._states[newState](this)
    this.state = newState
  }

  public draw(canvasCtx: CanvasRenderingContext2D, offsetX: number): void {
    this._strategy?.doMovingAlgorithm()
    this._curState.draw(canvasCtx, offsetX)
  }
}
