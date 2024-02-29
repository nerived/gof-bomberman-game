import { EnemyState } from './enemy.unit'
import { EnemyStrategy } from './strategy'

const potentialPosIndex = {
  LEFT: { x: -1, y: 0 },
  RIGHT: { x: 1, y: 0 },
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
}

type TPotentialPos = keyof typeof potentialPosIndex

export class DragonStrategy extends EnemyStrategy {
  private _getCurPos() {
    const { pX, pY } = this._enemyUnit
    this.curPosX = Math.trunc(pX / this.tileSize)
    this.curPosY = Math.trunc(pY / this.tileSize)
  }

  private _defineDirection() {
    const directions: TPotentialPos[] = []

    for (const [p, { x, y }] of Object.entries(potentialPosIndex)) {
      if (p in potentialPosIndex) {
        const dir = p as TPotentialPos

        const unit = this.levelMatrix[this.curPosY + y][this.curPosX + x]

        if (unit.passable) {
          directions.push(dir)
        }
      }
    }

    const randomIdx = Math.trunc(Math.random() * directions.length)
    const direction = directions[randomIdx]
    this._enemyUnit.setState(direction)
  }

  // private _checkCollision() {}

  public doMovingAlgorythm() {
    this._getCurPos()

    if (this._enemyUnit.state === EnemyState.IDLE) {
      this._defineDirection()
    } else {
      // check collison(curState: direction)
      // if collision > correct coords > store prev direction > set to idle
      // if must change direction set time for search and start
    }
  }
}
