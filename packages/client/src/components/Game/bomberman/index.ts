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
import { GameOverCommand } from './commands/game-over'
import { NextLevelCommand } from './commands/next-level'

const ENGINE = {
  START: 1,
  STOP: 0,
}

export class Bomberman {
  private engine = ENGINE.STOP
  private workingEngine = false
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

    player.onPlantBomb(new PlantBomb(player, playground, mechanics))
    player.onMove(new MovePlayer(player, window, playground, mechanics))

    inputHandler.onInput(new PlayerAction(player, inputHandler))

    const moveEnemy = (enemy: EnemyUnit) => {
      const command = new MoveEnemy(enemy, player, playground, mechanics)
      command.execute()
    }

    playground.onEnemyMove(moveEnemy)

    mechanics.setRestartCommand(new RestartLevel(this))
    mechanics.setNextLevelCommand(new NextLevelCommand(this))
    mechanics.setGameOverCommand(new GameOverCommand(this, mechanics))

    this.window = window
    this.inputHandler = inputHandler
    this.mechanics = mechanics
    this.playground = playground
    this.player = player
  }

  private _loopEngine = () => {
    if (this.engine === ENGINE.STOP) {
      this.workingEngine = false
      return
    }

    this.window.draw(this.playground, this.player, this.mechanics)

    requestAnimationFrame(this._loopEngine)

    this.workingEngine = true
  }

  private _init() {
    this.player.init()
    const levelMatrix = this.playground.start(this.player, this.mechanics.level)
    this.window.resetOffset()
    this.mechanics.start()
    this.inputHandler.start()
    this.player.setLevelMatrix(levelMatrix)
  }

  public play() {
    this.engine = ENGINE.START
    this._init()
    this.player.reset()
    !this.workingEngine && this._loopEngine()
  }

  public nextLevel() {
    this.engine = ENGINE.START
    this._init()
    !this.workingEngine && this._loopEngine()
  }

  public stop() {
    this.engine = ENGINE.STOP
    this.inputHandler.stop()
  }

  public willRestartHook?: (game: this) => void

  public didGameOverHook?: (totalScore: number, game: this) => void
}
