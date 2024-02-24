import { ICommand } from './basics/command'

export class Mechanics {
  private _endTime: number
  private _time = '0:00'
  private _command: ICommand | undefined
  private _lifes = 3
  private _score = 0
  public level = 1

  constructor() {
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

    // show information for player and then restart level by command
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
    const endTime = performance.now() + 5 * 60 * 1000
    this._endTime = endTime
    return endTime
  }

  public setCommand(command: ICommand) {
    this._command = command
  }

  public draw(canvasCtx: CanvasRenderingContext2D) {
    this._update()

    canvasCtx.textBaseline = 'top'
    canvasCtx.font = '40px Helvetica'
    canvasCtx.fillStyle = 'black'
    canvasCtx.fillText('Time: ' + this._time, 12, 12)
    canvasCtx.fillText('Life: ' + this._lifes, 12, 12 + 40 * 1)
    canvasCtx.fillText('Score: ' + this._score, 12, 12 + 40 * 2)
    canvasCtx.fillStyle = 'white'
    canvasCtx.fillText('Time: ' + this._time, 10, 10)
    canvasCtx.fillText('Life: ' + this._lifes, 10, 10 + 40 * 1)
    canvasCtx.fillText('Score: ' + this._score, 10, 10 + 40 * 2)
  }
}
