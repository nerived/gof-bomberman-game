import { IThingState } from './thing.unit'

const ammoImageSrc = '/src/components/Game/bomberman/assets/thing-ammo.png'

export class AmmoThingUnit implements IThingState {
  public image
  public type = 'AMMO' as const

  constructor() {
    this.image = new Image()
    this.image.src = ammoImageSrc
  }

  public getType() {
    return this.type
  }
}
