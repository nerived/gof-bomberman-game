import { Circle } from './circle'
import { Rect } from './rect'

export abstract class RectGameUnit extends Rect {
  public passable = false
  public destroyable = false
  abstract draw(_canvasCtx: CanvasRenderingContext2D, _offsetX: number): void
}

export abstract class CircleGameUnit extends Circle {
  public passable = false
  public destroyable = false
  abstract draw(_canvasCtx: CanvasRenderingContext2D, _offsetX: number): void
}

export type TGameUnit = RectGameUnit | CircleGameUnit
