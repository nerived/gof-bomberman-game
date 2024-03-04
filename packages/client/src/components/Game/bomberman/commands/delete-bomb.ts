import { ICommand } from '../basics/command'
import { BombUnit } from '../units/bomb/bomb.unit'
import { Playground } from '../playground'
import { PlayerUnit } from '../units/player/player.unit'

export class DeleteBomb implements ICommand {
  constructor(
    private readonly player: PlayerUnit,
    private readonly playground: Playground,
    private readonly bomb: BombUnit
  ) {}

  public execute() {
    this.player.bombAmmo++
    this.playground.endExplode(this.bomb)
  }
}
