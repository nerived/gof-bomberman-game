import { ICommand } from '../basics/command'
import { BombUnit } from '../units/bomb/bomb.unit'
import { Playground } from '../playground'
import { PlayerUnit } from '../units/player/player.unit'
import { DeleteBomb } from './delete-bomb'
import { circleVsRectCollision } from '../_lib'
import { Mechanics } from '../mechanics'

export class ExplodeBomb implements ICommand {
  constructor(
    private readonly player: PlayerUnit,
    private readonly playground: Playground,
    private readonly mechanics: Mechanics,
    private readonly bomb: BombUnit
  ) {}

  execute() {
    this.bomb.magnitude.forEach(unitInExplode => {
      let adjacentBomb: BombUnit | undefined
      if (unitInExplode instanceof BombUnit) {
        adjacentBomb = unitInExplode
      }
      adjacentBomb && adjacentBomb.detonate()
    })

    for (const flame of this.bomb.magnitude) {
      const { isOverlap } = circleVsRectCollision(this.player, flame, 0.4)
      if (!isOverlap) continue
      this.mechanics.minusLife()
      return
    }

    this.bomb.setCommand(
      new DeleteBomb(this.player, this.playground, this.bomb)
    )
  }
}
