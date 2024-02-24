import { IThingState } from './thing.unit'

const powerImageSrc = '/src/components/Game/bomberman/assets/thing-power.png'

export class PowerThingUnit implements IThingState {
  public image
  public type = 'POWER' as const

  constructor() {
    this.image = new Image()
    this.image.src = powerImageSrc
  }

  public getType() {
    return this.type
  }
}
