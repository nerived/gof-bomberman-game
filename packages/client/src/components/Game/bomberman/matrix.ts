import { TGameUnit } from './basics/unit'

export class Matrix {
  private _matrix: Array<TGameUnit[]>

  constructor(nLines = 1, nColumns = 1) {
    this._matrix = Array(nLines)
      .fill(null)
      .map(() => Array(nColumns))
  }

  private _checkNegativeCoords(y: number, x: number) {
    if (
      y < 0 ||
      x < 0 ||
      y > this._matrix.length - 1 ||
      x > this._matrix[0].length - 1
    ) {
      throw TypeError(`Unexpected coordinates: y=${y} x=${x}`)
    }
  }

  public getIn(y: number, x: number) {
    this._checkNegativeCoords(y, x)
    return this._matrix[y][x]
  }

  public setIn(y: number, x: number, tile: TGameUnit) {
    this._checkNegativeCoords(y, x)
    this._matrix[y][x] = tile
  }

  public getTileSize() {
    return this._matrix[0][0].width
  }

  public getLenY() {
    return this._matrix.length
  }

  public getLenX() {
    return this._matrix[0].length
  }
}
