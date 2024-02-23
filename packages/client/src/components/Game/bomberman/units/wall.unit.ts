import { RectGameUnit } from '../basics/unit'

export class WallUnit extends RectGameUnit {
  public passable = false
  public destroyable = false

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public draw() {}
}
