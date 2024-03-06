import { ICommand } from './basics/command'

interface TGameContext {
  pixelRatio: number
  visibleWidth: number
  visibleHeight: number
}

const LEVEL_TIME_7_MIN = 7 * 60 * 1_000
const LEVEL_LOAD_TIME_3_SEC = 3_000

export class Mechanics {
  private _endTime: number
  private _time = '0:00'
  private _restartCommand: ICommand | undefined
  private _gameOverCommand: ICommand | undefined
  private _nextLevelCommand: ICommand | undefined
  private _lifes = 3
  private _score = 0
  private _context
  private _loadingEndStamp = -1
  public level = 1

  constructor(context: TGameContext) {
    this._context = context
    this._endTime = this.start()
  }

  private _updateRemainingTime() {
    const dt = this._endTime - performance.now()
    const rawMin = Math.trunc(dt / 60_000)
    const rawSec = Math.trunc((dt - rawMin * 60_000) / 1000)
    const min = String(rawMin)
    const sec = rawSec > 9 ? String(rawSec) : '0' + rawSec

    this._time = min + ':' + sec
  }

  private _update() {
    this._updateRemainingTime()

    if (this._time === '0:00') {
      this._gameOverCommand?.execute()
    }
  }

  public plusScore(score: number) {
    this._score += score
  }

  public plusLife() {
    this._lifes++
  }

  public minusLife() {
    this._lifes--

    if (this._lifes === -1) {
      this._gameOverCommand?.execute()
    } else {
      this._restartCommand?.execute()
    }
  }

  public totalScore() {
    return this._score
  }

  public start() {
    this._loadingEndStamp = performance.now() + LEVEL_LOAD_TIME_3_SEC
    const endTime = performance.now() + LEVEL_TIME_7_MIN
    this._endTime = endTime
    return endTime
  }

  public setRestartCommand(command: ICommand) {
    this._restartCommand = command
  }

  public setGameOverCommand(command: ICommand) {
    this._gameOverCommand = command
  }

  public setNextLevelCommand(command: ICommand) {
    this._nextLevelCommand = command
  }

  public nextLevel() {
    this.level++
    this._nextLevelCommand?.execute()
  }

  public draw(canvasCtx: CanvasRenderingContext2D) {
    if (this._loadingEndStamp > performance.now()) {
      //TO DO draw loading level screen, need take window size from context

      canvasCtx.save()
      canvasCtx.fillStyle = '#34353d'
      canvasCtx.fillRect(
        0,
        0,
        this._context.visibleWidth,
        this._context.visibleHeight
      )
      canvasCtx.restore()

      canvasCtx.save()
      const fontSize = 48 * this._context.pixelRatio
      canvasCtx.textAlign = 'center'
      canvasCtx.textBaseline = 'middle'
      canvasCtx.font = `${fontSize}px Helvetica`
      canvasCtx.fillStyle = 'white'
      canvasCtx.fillText(
        `Level ${this.level}`,
        this._context.visibleWidth * 0.5,
        this._context.visibleHeight * 0.5
      )
      canvasCtx.restore()

      return
    }

    this._update()

    const fontSize = 20 * this._context.pixelRatio
    const textShadowX = 6 * this._context.pixelRatio
    const textShadowY = 6 * this._context.pixelRatio
    const textX = 5 * this._context.pixelRatio
    const textY = 5 * this._context.pixelRatio

    canvasCtx.textBaseline = 'top'
    canvasCtx.font = `${fontSize}px Helvetica`

    canvasCtx.fillStyle = 'black'
    canvasCtx.fillText('Time: ' + this._time, textShadowX, textShadowY)
    canvasCtx.fillText(
      'Life: ' + this._lifes,
      textShadowX,
      textShadowY + fontSize * 1
    )
    canvasCtx.fillText(
      'Score: ' + this._score,
      textShadowX,
      textShadowY + fontSize * 2
    )

    canvasCtx.fillStyle = 'white'
    canvasCtx.fillText('Time: ' + this._time, textX, textY)
    canvasCtx.fillText('Life: ' + this._lifes, textX, textY + fontSize * 1)
    canvasCtx.fillText('Score: ' + this._score, textX, textY + fontSize * 2)
  }
}
