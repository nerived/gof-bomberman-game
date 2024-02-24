import { IThingState } from './thing.unit'

const doorImageSrc = '/src/components/Game/bomberman/assets/thing-door.png'

export class DoorThingUnit implements IThingState {
  public image
  public type = 'DOOR' as const

  constructor() {
    this.image = new Image()
    this.image.src = doorImageSrc
  }

  public getType() {
    return this.type
  }
}
