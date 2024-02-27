import { ICommand } from '../basics/command'
import { InputHandler } from '../input-handler'
import { Playground } from '../playground'
import { GameWindow } from '../window'

export class RestartLevel implements ICommand {
  constructor(
    private readonly GameWindow: GameWindow,
    private readonly playground: Playground,
    private readonly inputHandler: InputHandler,
    private readonly level: number
  ) {}

  execute() {
    this.GameWindow.resetOffset()
    this.playground.start(this.level)
    this.inputHandler.reset()
  }
}
