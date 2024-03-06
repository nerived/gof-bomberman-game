import { IThingState, THING_TYPE } from './thing.unit'
import doorImageSrc from '../../assets/thing-door.png'

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
