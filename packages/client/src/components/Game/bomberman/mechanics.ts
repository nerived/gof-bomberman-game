import { ICommand } from './basics/command'

interface TGameContext {
  pixelRatio: number
}

export class Mechanics {
  private _endTime: number
  private _time = '0:00'
  private _command: ICommand | undefined
  private _lifes = 3
  private _score = 0
  private _context
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
      alert('game over')
      this._command?.execute()
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
      alert('game over')
      // TO DO route to game over page
      this._command?.execute()
    } else {
      alert('minus life, level will restart')
      this._command?.execute()
    }
  }

  public start() {
    const endTime = performance.now() + 7 * 60 * 1000
    this._endTime = endTime
    return endTime
  }

  public setCommand(command: ICommand) {
    this._command = command
  }

  public draw(canvasCtx: CanvasRenderingContext2D) {
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
