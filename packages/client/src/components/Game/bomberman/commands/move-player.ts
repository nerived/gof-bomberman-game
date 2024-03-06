import {
  circleVsCircleCollision,
  circleVsRectCollision,
  rectVsRect,
} from '../_lib'
import { ICommand } from '../basics/command'
import { Mechanics } from '../mechanics'
import { Playground } from '../playground'
import { PlayerUnit } from '../units/player/player.unit'
import { THING_TYPE } from '../units/thing/thing.unit'
import { GameWindow } from '../window'

export class MovePlayer implements ICommand {
  constructor(
    private readonly player: PlayerUnit,
    private readonly window: GameWindow,
    private readonly playground: Playground,
    private readonly mechanics: Mechanics
  ) {}

  private _switchBombToImpassable = () => {
    for (const bomb of this.playground.bombs) {
      !rectVsRect(this.player, bomb) && bomb.setToImpassable()
    }
  }

  private _doPlayerCollideLogicWithThings() {
    const { things } = this.playground

    const curThing = things.find(
      sThing => circleVsRectCollision(this.player, sThing, 0.1).isOverlap
    )

    if (!curThing) return

    if (curThing.getThingType() === THING_TYPE.DOOR) {
      if (this.playground.enemies.length !== 0) return

      this.mechanics.nextLevel()
      return
    }

    curThing.getThingType() === THING_TYPE.AMMO && this.player.bombAmmo++
    curThing.getThingType() === THING_TYPE.POWER && this.player.bombPower++
    curThing.getThingType() === THING_TYPE.LIFE && this.mechanics.plusLife()

    this.playground.things = things.filter(sThing => {
      return sThing.getThingType() === THING_TYPE.DOOR || sThing !== curThing
    })
  }

  private _doPlayerCollideLogicWithEnemies() {
    for (const enemy of this.playground.enemies) {
      if (!circleVsCircleCollision(this.player, enemy, 0.8)) continue
      this.mechanics.minusLife()
      return
    }
  }

  private _doPlayerCollideLogicWithFlame() {
    for (const bomb of this.playground.bombs) {
      if (!bomb.exploded) continue

      for (const flame of bomb.magnitude) {
        const { isOverlap } = circleVsRectCollision(this.player, flame, 0.4)
        if (!isOverlap) continue
        this.mechanics.minusLife()
        return
      }
    }
  }

  public execute() {
    this.window.stickWorldToPlayer(this.player)
    this._switchBombToImpassable()
    this._doPlayerCollideLogicWithFlame()
    this._doPlayerCollideLogicWithThings()
    this._doPlayerCollideLogicWithEnemies()
  }
}
