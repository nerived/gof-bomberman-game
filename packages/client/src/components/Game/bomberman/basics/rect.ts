export class Rect {
  private _x: number
  private _y: number
  private _pX: number
  private _pY: number
  private _width: number
  private _height: number

  constructor(x: number, y: number, width: number, height: number) {
    this._checkWidthOrHeight(width, height)
    this._x = x
    this._y = y
    this._width = width
    this._height = height
    this._pX = x + width * 0.5
    this._pY = y + height * 0.5
  }

  private _checkWidthOrHeight(...values: number[]) {
    values.forEach(value => {
      if (value < 0) {
        throw TypeError("Width and Height can't be negative")
      }
    })
  }

  get x() {
    return this._x
  }

  set x(value) {
    this._x = value
    this._pX = value + this._width * 0.5
  }

  get y() {
    return this._y
  }

  set y(value) {
    this._y = value
    this._pY = value + this._height * 0.5
  }

  get pX() {
    return this._pX
  }

  set pX(value) {
    const dif = value - this._pX
    this._x = this._x + dif
    this._pX = value
  }

  get pY() {
    return this._pY
  }

  set pY(value) {
    const dif = value - this._pY
    this._y = this._y + dif
    this._pY = value
  }

  get width() {
    return this._width
  }

  set width(value) {
    this._checkWidthOrHeight(value)

    const dif = this._width * 0.5 - value * 0.5
    this._x = this._x + dif
    this._width = value
  }

  get height() {
    return this._height
  }

  set height(value) {
    this._checkWidthOrHeight(value)

    const dif = this._height * 0.5 - value * 0.5
    this._y = this._y + dif
    this._height = value
  }

  public getLeft() {
    return this._x
  }

  public getRight() {
    return this._x + this._width
  }

  public getTop() {
    return this._y
  }

  public getBottom() {
    return this._y + this._height
  }

  public getType() {
    return 'rect' as const
  }
}
