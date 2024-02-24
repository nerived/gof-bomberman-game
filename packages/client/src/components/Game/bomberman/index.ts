import { PlayerUnit } from './units/player/player.unit'
import { PlantBomb } from './commands/add-bomb'
import { PlayerAction } from './commands/player-action'
import { Context } from './context'
import { InputHandler } from './input-handler'
import { MazeBuilder } from './maze-builder'
import { Playground } from './playground'
import { Mechanics } from './mechanics'
import { RestartLevel } from './commands/restart-level'
import { Window } from './window'
import { StickToPlayer } from './commands/stick-to-player'

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
      throw Error('Canvas context is not define')
    }

    const context = new Context()
    const window = new Window(canvasCtx, context)
    const player = new PlayerUnit(context)
    const mazeBuilder = new MazeBuilder(context)
    const mechanics = new Mechanics()
    const playground = new Playground(player, mazeBuilder, mechanics)
    const inputHandler = new InputHandler()

    player.onMove = playground.watchOnPlayer

    player.setCommand(new PlantBomb(playground))
    inputHandler.setCommand(new PlayerAction(player, inputHandler))
    playground.setComand(new StickToPlayer(window, player))
    mechanics.setCommand(
      new RestartLevel(window, playground, inputHandler, mechanics.level)
    )

    this.window = window
    this.inputHandler = inputHandler
    this.mechanics = mechanics
    this.playground = playground

    this.state = STATE.STOP
  }

  static computeGameLayout(width: number, height: number) {
    if (globalThis.screen.orientation.type === 'portrait-primary') {
      ;[width, height] = [height, width]
    }

    const curLines = Math.trunc(height / Context.tileSize)

    if (curLines >= Context.lines) {
      height -= (curLines - Context.lines) * Context.tileSize
      while (height / Context.tileSize !== Context.lines) {
        height--
      }

      width = Context.visibleColumns * Context.tileSize
    } else {
      let px = Context.tileSize
      while (Math.trunc(height / px) < Context.lines) {
        px -= 2
      }
      height = px * Context.lines
      width = px * Context.visibleColumns
    }

    const result = { height, width }
    return result
  }

  private _loopEngine = () => {
    if (this.state === STATE.STOP) return

    this.window.draw(this.playground, this.mechanics)

    requestAnimationFrame(this._loopEngine)
  }

  public start() {
    this.state = STATE.START
    this.playground.start(1)
    this.inputHandler.start()
    this._loopEngine()
  }

  public stop() {
    this.state = STATE.STOP
    this.inputHandler.stop()
  }
}
