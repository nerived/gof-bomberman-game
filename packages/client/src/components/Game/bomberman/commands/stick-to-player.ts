import { ICommand } from '../basics/command'
import { PlayerUnit } from '../units/player/player.unit'
import { Window } from '../window'

export class StickToPlayer implements ICommand {
  constructor(
    private readonly receiver: Window,
    private readonly player: PlayerUnit
  ) {}

  public execute() {
    this.receiver.stickWorldToPlayer(this.player)
  }
}
