export class Context {
  static lines = 13
  static visibleColumns = 22
  static columns = 35
  static tileSize = 56

  public mazeLines = Context.lines
  public mazeColumns = Context.columns
  public worldWidth = 0
  public worldHeight = 0
  public pixelRatio: number
  public tileSize = 0
  public visibleWidth = 0
  public visibleHeight = 0
  public stickyZoneStart = 0
  public stickyZoneEnd = 0

  constructor() {
    this.pixelRatio = globalThis.devicePixelRatio
    this._computeAll()
  }

  private _computeAll() {
    ;[this.tileSize, this.worldWidth, this.worldHeight] =
      this._computeWorldSize()
    ;[this.visibleWidth, this.visibleHeight] = this._computeVisibleSize()
    ;[this.stickyZoneStart, this.stickyZoneEnd] = this._computeStickyRange()
  }

  private _computeWorldSize() {
    const tileSize = Context.tileSize * globalThis.devicePixelRatio
    const worldHeight = Context.lines * tileSize
    const worldWidth = Context.columns * tileSize
    return [tileSize, worldWidth, worldHeight]
  }

  private _computeVisibleSize() {
    const visibleWidth = Context.visibleColumns * this.tileSize
    const visibleHeight = this.worldHeight
    return [visibleWidth, visibleHeight]
  }

  private _computeStickyRange() {
    const start = this.visibleWidth * 0.5 - this.tileSize
    const end = this.worldWidth - (this.visibleWidth - start)
    return [start, end]
  }
}
