import { IThingState, THING_TYPE } from './thing.unit'

const powerImageSrc = '/src/components/Game/bomberman/assets/thing-power.png'

export class PowerThingUnit implements IThingState {
  public image
  public type = THING_TYPE.POWER

  constructor() {
    this.image = new Image()
    this.image.src = powerImageSrc
  }

  public getType() {
    return this.type
  }
}
