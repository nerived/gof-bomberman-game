import { IThingState, THING_TYPE } from './thing.unit'
import lifeImageSrc from '../../assets/thing-life.png'

export class LifeThingUnit implements IThingState {
  public image
  public type = THING_TYPE.LIFE

  constructor() {
    this.image = new Image()
    this.image.src = lifeImageSrc
  }

  public getType() {
    return this.type
  }
}
