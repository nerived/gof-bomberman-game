import { Bomberman } from '..'
import { ICommand } from '../basics/command'

export class NextLevelCommand implements ICommand {
  constructor(private readonly game: Bomberman) {}

  public execute() {
    this.game.nextLevel()
  }
}
