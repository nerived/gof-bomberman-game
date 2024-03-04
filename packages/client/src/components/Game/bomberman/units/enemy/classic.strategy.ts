import { EnemyState } from './enemy.unit'
import { EnemyStrategy } from './strategy'

const posIndexH = {
  LEFT: { x: -1, y: 0 },
  RIGHT: { x: 1, y: 0 },
}

const posIndexV = {
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
}

type TPosIndexH = keyof typeof posIndexH
type TPosIndexV = keyof typeof posIndexV
type TPosIndexAll = TPosIndexH | TPosIndexV

export class ClassicStrategy extends EnemyStrategy {
  private _timeStamp = performance.now()
  private _timeToChangePath = 5_000
  private _inSearch = false
  private _changingTimeRange = 15_000

  private _resetTimeStamp() {
    this._timeStamp = performance.now()
  }

  private _getDt() {
    return performance.now() - this._timeStamp
  }

  private _canChangePath() {
    return (
      this._enemyUnit.getLeft() % this._tileSize === 0 &&
      this._enemyUnit.getTop() % this._tileSize === 0
    )
  }

  private _updateTimes() {
    const list = [3_000, 5_000, 7_000, 9_000, 10_000, 12_000, 14_000, 20_000]
    this._timeToChangePath = list[(Math.random() * list.length) << 0]
    this._changingTimeRange = list[(Math.random() * list.length) << 0]
  }

  private _defineDirection() {
    const directions: TPosIndexAll[] = []

    const { curPosX, curPosY } = this._enemyUnit.getCurPos()

    for (const [p, { x, y }] of [
      ...Object.entries(posIndexH),
      ...Object.entries(posIndexV),
    ]) {
      const dir = p as TPosIndexAll

      const unit = this._levelMatrix.getIn(curPosY + y, curPosX + x)

      if (unit.passable) {
        directions.push(dir)
      }
    }

    const randomIdx = Math.trunc(Math.random() * directions.length)
    const direction = directions[randomIdx]
    this._enemyUnit.setState(direction)
  }

  private _updateSearchState() {
    const prevState = this._inSearch

    if (!this._inSearch) {
      this._inSearch = this._getDt() >= this._timeToChangePath
    } else if (this._inSearch) {
      this._inSearch = !(this._getDt() >= this._changingTimeRange)
    }

    prevState !== this._inSearch && this._resetTimeStamp()
  }

  private _searchNewPath() {
    if (!this._inSearch || !this._canChangePath()) return

    const directions: TPosIndexAll[] = []

    const observablePos =
      this._enemyUnit.state === EnemyState.LEFT ||
      this._enemyUnit.state === EnemyState.RIGHT
        ? posIndexV
        : posIndexH

    const { curPosX, curPosY } = this._enemyUnit.getCurPos()

    for (const [p, { x, y }] of Object.entries(observablePos)) {
      const dir = p as TPosIndexAll
      const unit = this._levelMatrix.getIn(curPosY + y, curPosX + x)

      if (unit.passable) {
        directions.push(dir)
      }
    }

    if (directions.length === 0) return

    const randomIdx = Math.trunc(Math.random() * directions.length)
    this._inSearch = false
    this._resetTimeStamp()
    this._updateTimes()
    this._enemyUnit.setState(directions[randomIdx])
  }

  public doMovingAlgorithm() {
    if (this._enemyUnit.state === EnemyState.IDLE) {
      this._defineDirection()
      return
    }

    this._updateSearchState()

    this._searchNewPath()
  }
}
