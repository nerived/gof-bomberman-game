export class Circle {
  private _x: number
  private _y: number
  private _pX: number
  private _pY: number
  private _radius: number

  constructor(x: number, y: number, radius: number) {
    this._pX = x + radius
    this._pY = y + radius
    this._x = x
    this._y = y

    this._checkRadiusValue(radius)

    this._radius = radius
  }

  private _checkRadiusValue(value: number) {
    if (value < 0) {
      throw TypeError("Radius can't be negative")
    }
  }

  get x() {
    return this._x
  }

  set x(value) {
    this._x = value
    this._pX = value + this._radius
  }

  get y() {
    return this._y
  }

  set y(value) {
    this._y = value
    this._pY = value + this._radius
  }

  get pX() {
    return this._pX
  }

  set pX(value) {
    this._pX = value
    this._x = value - this._radius
  }

  get pY() {
    return this._pY
  }

  set pY(value) {
    this._pY = value
    this._y = value - this._radius
  }

  get radius() {
    return this._radius
  }

  set radius(value) {
    this._checkRadiusValue(value)

    const dif = this._radius - value
    this._x = this._x + dif
    this._y = this._y + dif
    this._radius = value
  }

  get width() {
    return this._radius << 1
  }

  get height() {
    return this._radius << 1
  }

  public getLeft() {
    return this._x
  }

  public getRight() {
    return this._x + (this._radius << 1)
  }

  public getTop() {
    return this._y
  }

  public getBottom() {
    return this._y + (this._radius << 1)
  }

  public getType() {
    return 'circle' as const
  }
}
