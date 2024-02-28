import { ICommand } from '../basics/command'
import { Playground } from '../playground'

export class PlantBomb implements ICommand {
  constructor(private readonly playground: Playground) {}

  execute() {
    this.playground.plantBomb()
  }
}
