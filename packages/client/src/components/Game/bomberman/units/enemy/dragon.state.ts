import { EnemyUnit } from './enemy.unit'
import enemyImageSrc from '../../assets/enemy.png'
import { IEnemyState } from './state'

export abstract class DragonState implements IEnemyState {
  private _image
  private _score
  protected _velocity

  constructor(protected readonly enemy: EnemyUnit) {
    this._image = new Image()
    this._image.src = enemyImageSrc
    this._score = 200
    this._velocity = this.enemy.velocity * 0.5
  }

  protected abstract _update(): void

  public getScore() {
    return this._score
  }

  public draw(canvasCtx: CanvasRenderingContext2D, offsetX: number): void {
    this._update()

    canvasCtx.save()

    // debug circle >>>
    canvasCtx.beginPath()
    canvasCtx.arc(
      this.enemy.pX + offsetX,
      this.enemy.pY,
      this.enemy.radius,
      0,
      2 * Math.PI
    )
    canvasCtx.strokeStyle = 'red'
    canvasCtx.fillStyle = 'rgba(240 200 200 / 70%)'
    canvasCtx.stroke()
    canvasCtx.fill()
    // <<< debug circle

    canvasCtx.drawImage(
      this._image,
      this.enemy.x + offsetX,
      this.enemy.y,
      this.enemy.radius * 2,
      this.enemy.radius * 2
    )

    canvasCtx.restore()
  }
}

class Idle extends DragonState {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  protected _update() {}
}

class MoveLeft extends DragonState {
  protected _update() {
    this.enemy.x -= this._velocity
    this.enemy.onMove?.()
  }
}

class MoveRight extends DragonState {
  protected _update() {
    this.enemy.x += this._velocity
    this.enemy.onMove?.()
  }
}

class MoveUp extends DragonState {
  protected _update() {
    this.enemy.y -= this._velocity
    this.enemy.onMove?.()
  }
}

class MoveDown extends DragonState {
  protected _update() {
    this.enemy.y += this._velocity
    this.enemy.onMove?.()
  }
}

export const DRAGON = {
  IDLE: Idle,
  LEFT: MoveLeft,
  UP: MoveUp,
  RIGHT: MoveRight,
  DOWN: MoveDown,
}
