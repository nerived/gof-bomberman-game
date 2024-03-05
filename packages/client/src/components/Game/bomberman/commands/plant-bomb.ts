import { ICommand } from '../basics/command'
import { Mechanics } from '../mechanics'
import { Playground } from '../playground'
import { PlayerUnit } from '../units/player/player.unit'
import { ExplodeBomb } from './explode-bomb'

export class PlantBomb implements ICommand {
  constructor(
    private readonly player: PlayerUnit,
    private readonly playground: Playground,
    private readonly mechanics: Mechanics
  ) {}

  execute() {
    const bomb = this.playground.plantBomb(this.player)

    if (!bomb) return

    this.player.bombAmmo--

    bomb.setCommand(
      new ExplodeBomb(this.player, this.playground, this.mechanics, bomb)
    )
  }
}
