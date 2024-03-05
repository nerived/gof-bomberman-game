import { CircleGameUnit } from '../../basics/unit'
import { IEnemyState, TStateIndex } from './state'
import { DRAGON } from './dragon.state'
import { EnemyStrategy } from './strategy'
import { Matrix } from '../../matrix'

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

type TEnemyStateUnion = keyof typeof EnemyState

export class EnemyUnit extends CircleGameUnit {
  public passable = true
  public destroyable = false
  public velocity: number
  public levelMatrix: Matrix
  public state: TEnemyStateUnion
  public onMoveCommand: ((enemyUnit: this) => void) | undefined
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
  }

  onMove(fn?: (enemyUnit: this) => void) {
    this.onMoveCommand = fn
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

  public setState(newState: keyof typeof EnemyState) {
    this._curState = new this._states[newState](this)
    this.state = newState
  }

  public draw(canvasCtx: CanvasRenderingContext2D, offsetX: number): void {
    this._strategy?.doMovingAlgorithm()
    this._curState.draw(canvasCtx, offsetX)
  }
}
