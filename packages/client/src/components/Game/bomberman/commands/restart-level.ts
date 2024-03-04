import { Bomberman } from '..'
import { ICommand } from '../basics/command'

export class RestartLevel implements ICommand {
  constructor(private readonly game: Bomberman) {}

  execute() {
    this.game.restart()
  }
}
