import { ICommand } from '../basics/command'
import { InputHandler } from '../input-handler'

import { Playground } from '../playground'
import { Window } from '../window'

export class RestartLevel implements ICommand {
  constructor(
    private readonly window: Window,
    private readonly playground: Playground,
    private readonly inputHandler: InputHandler,
    private readonly level: number
  ) {}

  execute() {
    this.window.resetOffset()
    this.playground.start(this.level)
    this.inputHandler.reset()
  }
}
