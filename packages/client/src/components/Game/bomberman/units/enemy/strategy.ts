import { EnemyUnit } from './enemy.unit'

export abstract class EnemyStrategy {
  protected curPosX = 0
  protected curPosY = 0
  protected tileSize
  protected levelMatrix

  constructor(protected readonly _enemyUnit: EnemyUnit) {
    this.levelMatrix = this._enemyUnit.levelMatrix
    this.tileSize = this.levelMatrix[0][0].width
  }

  public abstract doMovingAlgorythm(): void
}
