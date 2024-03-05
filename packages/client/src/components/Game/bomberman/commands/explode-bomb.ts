import { ICommand } from '../basics/command'
import { BombUnit } from '../units/bomb/bomb.unit'
import { Playground } from '../playground'
import { PlayerUnit } from '../units/player/player.unit'
import { DeleteBomb } from './delete-bomb'
import { circleVsRectCollision } from '../_lib'
import { Mechanics } from '../mechanics'
import { TGameUnit } from '../basics/unit'

export class ExplodeBomb implements ICommand {
  constructor(
    private readonly player: PlayerUnit,
    private readonly playground: Playground,
    private readonly mechanics: Mechanics,
    private readonly bomb: BombUnit
  ) {}

  private _doCollideWithEnemy(flame: TGameUnit) {
    for (const enemy of this.playground.enemies) {
      const { isOverlap } = circleVsRectCollision(enemy, flame, 0.4)
      if (!isOverlap) continue

      this.mechanics.plusScore(enemy.getScore())
      this.playground.enemies = this.playground.enemies.filter(
        sEnemyUnit => sEnemyUnit !== enemy
      )
    }
  }

  private _doCollideWithPlayer(flame: TGameUnit) {
    const { isOverlap } = circleVsRectCollision(this.player, flame, 0.4)
    if (!isOverlap) return
    this.mechanics.minusLife()
  }

  public execute() {
    this.bomb.magnitude.forEach(unitInExplode => {
      let adjacentBomb: BombUnit | undefined
      if (unitInExplode instanceof BombUnit) {
        adjacentBomb = unitInExplode
      }
      adjacentBomb && adjacentBomb.detonate()
    })

    for (const flame of this.bomb.magnitude) {
      this._doCollideWithEnemy(flame)

      this._doCollideWithPlayer(flame)
    }

    this.bomb.setCommand(
      new DeleteBomb(this.player, this.playground, this.bomb)
    )
  }
}
