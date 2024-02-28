import { ICommand } from '../basics/command'
import { BombUnit } from '../units/bomb/bomb.unit'
import { Playground } from '../playground'

export class DeleteBomb implements ICommand {
  constructor(
    private readonly playground: Playground,
    private readonly bomb: BombUnit
  ) {}

  public execute() {
    this.playground.endExplode(this.bomb)
  }
}
