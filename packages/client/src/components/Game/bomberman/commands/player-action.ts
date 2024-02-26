import { ICommand } from '../basics/command'
import { PlayerUnit } from '../units/player/player.unit'
import { InputHandler } from '../input-handler'

export class PlayerAction implements ICommand {
  constructor(
    private readonly receiver: PlayerUnit,
    private readonly invoker: InputHandler
  ) {}

  execute() {
    this.receiver.action(this.invoker.actionList)
  }
}
