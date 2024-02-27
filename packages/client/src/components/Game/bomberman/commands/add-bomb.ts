import { ICommand } from '../basics/command'
import { Playground } from '../playground'

export class PlantBomb implements ICommand {
  constructor(private readonly receiver: Playground) {}

  execute() {
    this.receiver.plantBomb()
  }
}
