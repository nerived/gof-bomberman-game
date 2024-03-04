import { PlayerUnit } from './units/player/player.unit'
import { PlantBomb } from './commands/plant-bomb'
import { PlayerAction } from './commands/player-action'
import { GameContext } from './context'
import { InputHandler } from './input-handler'
import { MazeBuilder } from './maze-builder'
import { Playground } from './playground'
import { Mechanics } from './mechanics'
import { RestartLevel } from './commands/restart-level'
import { GameWindow } from './window'
import { MovePlayer } from './commands/move-player'

const STATE = {
  START: 1,
  STOP: 0,
}

export class Bomberman {
  private state
  private window
  private mechanics
  private playground
  private inputHandler

  constructor(canvasEl: HTMLCanvasElement) {
    const canvasCtx = canvasEl.getContext('2d')

    if (!canvasCtx) {
      throw Error('Canvas GameContext is not define')
    }

    const context = new GameContext()
    const window = new GameWindow(canvasCtx, context)
    const player = new PlayerUnit(context)
    const mazeBuilder = new MazeBuilder(context)
    const mechanics = new Mechanics(context)
    const playground = new Playground(player, mazeBuilder)
    const inputHandler = new InputHandler()

    player.onMove = playground.watchOnPlayer

    player.setCommand(new PlantBomb(player, playground, mechanics))

    inputHandler.setCommand(new PlayerAction(player, inputHandler))

    playground.setCommand(new MovePlayer(player, window, playground, mechanics))

    mechanics.setCommand(
      new RestartLevel(window, playground, inputHandler, mechanics.level)
    )

    this.window = window
    this.inputHandler = inputHandler
    this.mechanics = mechanics
    this.playground = playground

    this.state = STATE.STOP
  }

  private _loopEngine = () => {
    if (this.state === STATE.STOP) return

    this.window.draw(this.playground, this.mechanics)

    requestAnimationFrame(this._loopEngine)
  }

  public start() {
    this.state = STATE.START
    this.playground.start(1)
    this.mechanics.start()
    this.inputHandler.start()
    this._loopEngine()
  }

  public stop() {
    this.state = STATE.STOP
    this.inputHandler.stop()
  }
}
