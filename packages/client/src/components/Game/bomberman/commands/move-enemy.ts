import {
  circleVsCircleCollision,
  circleVsRectCollision,
  rectVsRect,
} from '../_lib'
import { ICommand } from '../basics/command'
import { Mechanics } from '../mechanics'
import { Playground } from '../playground'
import { EnemyState, EnemyUnit } from '../units/enemy/enemy.unit'
import { PlayerUnit } from '../units/player/player.unit'

export class MoveEnemy implements ICommand {
  constructor(
    private readonly enemy: EnemyUnit,
    private readonly player: PlayerUnit,
    private readonly playground: Playground,
    private readonly mechanics: Mechanics
  ) {}

  private _doEnemyCollideLogicWithPlayer() {
    if (!rectVsRect(this.enemy, this.player)) return

    if (!circleVsCircleCollision(this.enemy, this.player, 0.8)) return

    this.mechanics.minusLife()
  }

  private _doEnemyCollideLogicWithFlame() {
    for (const bomb of this.playground.bombs) {
      if (!bomb.exploded) continue

      for (const flame of bomb.magnitude) {
        const { isOverlap } = circleVsRectCollision(this.enemy, flame, 0.4)
        if (!isOverlap) continue

        this.mechanics.plusScore(this.enemy.getScore())
        this.enemy.setState(EnemyState.DEAD)
        return
      }
    }
  }

  public execute() {
    this._doEnemyCollideLogicWithPlayer()
    this._doEnemyCollideLogicWithFlame()
  }
}
