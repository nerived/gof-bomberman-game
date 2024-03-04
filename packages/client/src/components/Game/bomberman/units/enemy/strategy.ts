import { EnemyUnit } from './enemy.unit'

export abstract class EnemyStrategy {
  protected _curPosX = 0
  protected _curPosY = 0
  protected _tileSize
  protected _levelMatrix

  constructor(protected readonly _enemyUnit: EnemyUnit) {
    this._levelMatrix = this._enemyUnit.levelMatrix
    this._tileSize = this._levelMatrix.getTileSize()
  }

  public abstract doMovingAlgorithm(): void
}
