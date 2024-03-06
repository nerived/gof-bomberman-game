import { Bomberman } from '..'
import { ICommand } from '../basics/command'
import { Mechanics } from '../mechanics'

export class GameOverCommand implements ICommand {
  constructor(
    private readonly game: Bomberman,
    private readonly mechanics: Mechanics
  ) {}

  public execute() {
    this.game.stop()
    this.game.didGameOverHook?.(this.mechanics.totalScore(), this.game)
  }
}
