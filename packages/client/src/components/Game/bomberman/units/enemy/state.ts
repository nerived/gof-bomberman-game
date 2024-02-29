import { EnemyUnit } from './enemy.unit'

export interface IEnemyState {
  getScore: () => number
  draw: (canvasCtx: CanvasRenderingContext2D, offsetX: number) => void
}

type TEnemyStateConstructor = new (inst: EnemyUnit) => IEnemyState

export type TStateIndex = {
  IDLE: TEnemyStateConstructor
  LEFT: TEnemyStateConstructor
  UP: TEnemyStateConstructor
  RIGHT: TEnemyStateConstructor
  DOWN: TEnemyStateConstructor
}
