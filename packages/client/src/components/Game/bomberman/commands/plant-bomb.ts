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
    const { pX, pY, bombPower } = this.player
    const bomb = this.playground.addBomb(pX, pY, bombPower)

    if (!bomb) return

    this.player.ammo--

    bomb.setCommand(
      new ExplodeBomb(this.player, this.playground, this.mechanics, bomb)
    )
  }
}
