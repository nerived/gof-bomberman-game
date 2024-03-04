import { ICommand } from '../basics/command'
import { InputHandler } from '../input-handler'
import { Playground } from '../playground'
import { PlayerUnit } from '../units/player/player.unit'
import { GameWindow } from '../window'

export class RestartLevel implements ICommand {
  constructor(
    private readonly window: GameWindow,
    private readonly player: PlayerUnit,
    private readonly playground: Playground,
    private readonly inputHandler: InputHandler,
    private readonly level: number
  ) {}

  execute() {
    this.window.resetOffset()
    this.playground.start(this.player, this.level)
    this.inputHandler.reset()
  }
}
