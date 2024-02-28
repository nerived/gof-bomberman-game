import { IThingState, THING_TYPE } from './thing.unit'

const ammoImageSrc = '/src/components/Game/bomberman/assets/thing-ammo.png'

export class AmmoThingUnit implements IThingState {
  public image
  public type = THING_TYPE.AMMO

  constructor() {
    this.image = new Image()
    this.image.src = ammoImageSrc
  }

  public getType() {
    return this.type
  }
}
