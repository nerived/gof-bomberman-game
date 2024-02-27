import { IThingState, THING_TYPE } from './thing.unit'

const doorImageSrc = '/src/components/Game/bomberman/assets/thing-door.png'

export class DoorThingUnit implements IThingState {
  public image
  public type = THING_TYPE.DOOR

  constructor() {
    this.image = new Image()
    this.image.src = doorImageSrc
  }

  public getType() {
    return this.type
  }
}
