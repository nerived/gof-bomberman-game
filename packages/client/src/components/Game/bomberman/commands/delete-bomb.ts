import { ICommand } from '../basics/command'
import { BombUnit } from '../units/bomb/bomb.unit'
import { Playground } from '../playground'

export class DeleteBomb implements ICommand {
  constructor(
    private readonly receiver: Playground,
    private readonly bomb: BombUnit
  ) {}

  public execute() {
    this.receiver.endExplode(this.bomb)
  }
}
