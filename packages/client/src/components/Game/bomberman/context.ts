export class GameContext {
  static lines = 13
  static visibleColumns = 22
  static columns = 35
  static defaultTileSize = 56
  static defaultUnitVelocity = 4

  public mazeLines = GameContext.lines
  public mazeColumns = GameContext.columns
  public worldWidth = 0
  public worldHeight = 0
  public pixelRatio = 1
  public tileSize = 0
  public visibleWidth = 0
  public visibleHeight = 0
  public stickyZoneStart = 0
  public stickyZoneEnd = 0
  public unitVelocity = 0

  constructor() {
    this.pixelRatio = globalThis.devicePixelRatio
    this._computeAll()
  }

  private _computeAll() {
    const { tileSize, worldHeight, worldWidth, unitVelocity } =
      this._computeWorldSize()
    this.tileSize = tileSize
    this.worldWidth = worldWidth
    this.worldHeight = worldHeight
    this.unitVelocity = unitVelocity

    const { visibleWidth, visibleHeight } = this._computeVisibleSize()
    this.visibleWidth = visibleWidth
    this.visibleHeight = visibleHeight

    const { start, end } = this._computeStickyRange()
    this.stickyZoneStart = start
    this.stickyZoneEnd = end
  }

  private _computeWorldSize() {
    const { innerWidth, innerHeight, devicePixelRatio } = globalThis

    const tileWidth = Math.trunc(innerWidth / 22)
    const tileHeight = Math.trunc(innerHeight / 13)

    let tileSize =
      Math.min(tileHeight, tileWidth, GameContext.defaultTileSize) *
      devicePixelRatio

    if (tileSize % 2 !== 0) {
      tileSize -= 1
    }

    const worldHeight = GameContext.lines * tileSize
    const worldWidth = GameContext.columns * tileSize

    const unitVelocity = Math.round(
      (tileSize / (GameContext.defaultTileSize * devicePixelRatio)) *
        GameContext.defaultUnitVelocity *
        devicePixelRatio
    )

    return { tileSize, worldWidth, worldHeight, unitVelocity }
  }

  private _computeVisibleSize() {
    const visibleWidth = GameContext.visibleColumns * this.tileSize
    console.log(visibleWidth)
    const visibleHeight = this.worldHeight
    return { visibleWidth, visibleHeight }
  }

  private _computeStickyRange() {
    const start = this.visibleWidth * 0.5 - this.tileSize
    const end = this.worldWidth - (this.visibleWidth - start)
    return { start, end }
  }
}
