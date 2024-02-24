import { RectGameUnit } from '../../basics/unit'
import { AmmoThingUnit } from './ammo.state'
import { DoorThingUnit } from './door.state'
import { LifeThingUnit } from './life.state'
import { PowerThingUnit } from './power.state'

const STATE_INDEX = {
  AMMO: AmmoThingUnit,
  POWER: PowerThingUnit,
  LIFE: LifeThingUnit,
  DOOR: DoorThingUnit,
}

export interface IThingState {
  image: HTMLImageElement
  getType(): TThingTypeUnion
}

export type TThingTypeUnion = 'DOOR' | 'AMMO' | 'POWER' | 'LIFE'

export class ThingUnit extends RectGameUnit {
  public passable = true
  private _state: IThingState

  constructor(
    type: TThingTypeUnion,
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
    canvasCtx.drawImage(this._state.image, this.x + offsetX, this.y)
  }
}
