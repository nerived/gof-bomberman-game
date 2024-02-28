import { RectGameUnit } from '../../basics/unit'
import { AmmoThingUnit } from './ammo.state'
import { DoorThingUnit } from './door.state'
import { LifeThingUnit } from './life.state'
import { PowerThingUnit } from './power.state'

export const enum THING_TYPE {
  DOOR = 'DOOR',
  AMMO = 'AMMO',
  POWER = 'POWER',
  LIFE = 'LIFE',
}

const STATE_INDEX = {
  DOOR: DoorThingUnit,
  AMMO: AmmoThingUnit,
  POWER: PowerThingUnit,
  LIFE: LifeThingUnit,
}

export interface IThingState {
  image: HTMLImageElement
  getType(): THING_TYPE
}

export class ThingUnit extends RectGameUnit {
  public passable = true
  private _state: IThingState

  constructor(
    type: THING_TYPE,
    x: number,
    y: number,
    width: number,
    height: number
  ) {
    super(x, y, width, height)
    this._state = new STATE_INDEX[type]()
  }

  public getThingType() {
    return this._state.getType()
  }

  public draw(canvasCtx: CanvasRenderingContext2D, offsetX: number) {
    canvasCtx.drawImage(
      this._state.image,
      this.x + offsetX,
      this.y,
      this.width,
      this.height
    )
  }
}
