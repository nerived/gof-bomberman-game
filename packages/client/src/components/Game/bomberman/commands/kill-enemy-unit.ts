import { ICommand } from '../basics/command'
import { Playground } from '../playground'
import { EnemyUnit } from '../units/enemy/enemy.unit'

export class KillEnemyUnit implements ICommand {
  constructor(
    private readonly playground: Playground,
    private readonly enemy: EnemyUnit
  ) {}

  public execute() {
    this.playground.enemies = this.playground.enemies.filter(
      sEnemyUnit => sEnemyUnit !== this.enemy
    )
  }
}
