import { RectGameUnit } from '../basics/unit'

export class PassageUnit extends RectGameUnit {
  public passable = true
  public destroyable = true

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public draw() {}
}
