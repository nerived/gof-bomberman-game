import { ICommand } from '../basics/command'
import { PlayerUnit } from '../units/player/player.unit'
import { GameWindow } from '../window'

export class StickToPlayer implements ICommand {
  constructor(
    private readonly receiver: GameWindow,
    private readonly player: PlayerUnit
  ) {}

  public execute() {
    this.receiver.stickWorldToPlayer(this.player)
  }
}
