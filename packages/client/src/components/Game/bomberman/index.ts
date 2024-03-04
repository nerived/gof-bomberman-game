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
import { EnemyUnit } from './units/enemy/enemy.unit'
import { MoveEnemy } from './commands/move-enemy'

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
  private player

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

    const playground = new Playground(mazeBuilder)
    const inputHandler = new InputHandler()

    player.setCommandOnPlantBomb(new PlantBomb(player, playground, mechanics))
    player.setCommandOnMove(
      new MovePlayer(player, window, playground, mechanics)
    )

    inputHandler.setCommand(new PlayerAction(player, inputHandler))

    const moveEnemy = (enemy: EnemyUnit) => {
      new MoveEnemy(enemy, player, playground, mechanics).execute()
    }

    playground.setCommand(moveEnemy)

    mechanics.setCommand(
      new RestartLevel(
        window,
        player,
        playground,
        inputHandler,
        mechanics.level
      )
    )

    this.window = window
    this.inputHandler = inputHandler
    this.mechanics = mechanics
    this.playground = playground
    this.player = player

    this.state = STATE.STOP
  }

  private _loopEngine = () => {
    if (this.state === STATE.STOP) return

    this.window.draw(this.playground, this.player, this.mechanics)

    requestAnimationFrame(this._loopEngine)
  }

  public start() {
    this.state = STATE.START
    const levelMatrix = this.playground.start(this.player, 1)
    this.mechanics.start()
    this.inputHandler.start()
    this.player.setLevelMatrix(levelMatrix)
    this.player.start()
    this._loopEngine()
  }

  public stop() {
    this.state = STATE.STOP
    this.inputHandler.stop()
  }
}
