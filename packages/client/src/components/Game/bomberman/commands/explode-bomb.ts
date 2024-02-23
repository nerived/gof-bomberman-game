import { ICommand } from '../basics/command'
import { BombUnit } from '../units/bomb/bomb.unit'
import { Playground } from '../playground'

export class ExplodeBomb implements ICommand {
  constructor(
    private readonly receiver: Playground,
    private readonly bomb: BombUnit
  ) {}

  execute() {
    this.receiver.startExplode(this.bomb)
  }
}
