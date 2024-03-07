import { circleVsRectCollision, potentialPositions } from '../../_lib'
import { PlayerUnit, SPRITE_INDEX, SPRITE_SIZE } from './player.unit'

export abstract class PlayerState {
  protected sprite = 0
  protected frame = 0

  constructor(protected readonly player: PlayerUnit) {}

  public abstract useAction(): void
  public abstract draw(
    canvasCtx: CanvasRenderingContext2D,
    offsetX: number
  ): void
}

class Idle extends PlayerState {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public useAction() {}
  public draw(canvasCtx: CanvasRenderingContext2D, offsetX: number) {
    canvasCtx.drawImage(
      this.player.image,
      SPRITE_SIZE * this.sprite,
      SPRITE_SIZE * SPRITE_INDEX.IDLE.posY,
      SPRITE_SIZE,
      SPRITE_SIZE,
      this.player.x + offsetX,
      this.player.y,
      this.player.radius * 2,
      this.player.radius * 2
    )
  }
}

class Bomb extends PlayerState {
  public useAction() {
    if (this.player.ammo == 0) return
    this.player.plantBombCommand?.execute()
  }

  public draw(canvasCtx: CanvasRenderingContext2D, offsetX: number) {
    canvasCtx.drawImage(
      this.player.image,
      SPRITE_SIZE * this.sprite,
      SPRITE_SIZE * SPRITE_INDEX.BOMB.posY,
      SPRITE_SIZE,
      SPRITE_SIZE,
      this.player.x + offsetX,
      this.player.y,
      this.player.radius * 2,
      this.player.radius * 2
    )
  }
}

class MoveState extends PlayerState {
  protected _preventWallCollision() {
    const { pX, pY } = this.player
    const tileSize = this.player.levelMatrix.getTileSize()
    const curPosX = Math.trunc(pX / tileSize)
    const curPosY = Math.trunc(pY / tileSize)

    for (const [x, y] of potentialPositions) {
      const potentialTile = this.player.levelMatrix.getIn(
        curPosY + y,
        curPosX + x
      )

      if (potentialTile.passable) continue

      const { pX, pY, isOverlap } = circleVsRectCollision(
        this.player,
        potentialTile
      )

      if (!isOverlap) continue

      this.player.pX = pX
      this.player.pY = pY
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public useAction(): void {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public draw(canvasCtx: CanvasRenderingContext2D, offsetX: number): void {}
}

class MoveLeft extends MoveState {
  private update() {
    this.frame++

    if (this.frame % SPRITE_INDEX.LEFT.throttle === 0) {
      this.frame = 0
      this.sprite = (this.sprite + 1) % SPRITE_INDEX.LEFT.frames
    }
  }

  public useAction() {
    this.player.x -= this.player.maxVelocity
    this._preventWallCollision()
    this.player.moveCommand?.execute()
  }

  public draw(canvasCtx: CanvasRenderingContext2D, offsetX: number) {
    this.update()

    canvasCtx.drawImage(
      this.player.image,
      SPRITE_SIZE * this.sprite,
      SPRITE_SIZE * SPRITE_INDEX.LEFT.posY,
      SPRITE_SIZE,
      SPRITE_SIZE,
      this.player.x + offsetX,
      this.player.y,
      this.player.radius * 2,
      this.player.radius * 2
    )
  }
}

class MoveRight extends MoveState {
  private update() {
    this.frame++

    if (this.frame % SPRITE_INDEX.RIGHT.throttle === 0) {
      this.frame = 0
      this.sprite = (this.sprite + 1) % SPRITE_INDEX.RIGHT.frames
    }
  }

  public useAction() {
    this.player.x += this.player.maxVelocity
    this._preventWallCollision()
    this.player.moveCommand?.execute()
  }

  public draw(canvasCtx: CanvasRenderingContext2D, offsetX: number) {
    this.update()

    canvasCtx.drawImage(
      this.player.image,
      SPRITE_SIZE * this.sprite,
      SPRITE_SIZE * SPRITE_INDEX.RIGHT.posY,
      SPRITE_SIZE,
      SPRITE_SIZE,
      this.player.x + offsetX,
      this.player.y,
      this.player.radius * 2,
      this.player.radius * 2
    )
  }
}

class MoveUp extends MoveState {
  private update() {
    this.frame++

    if (this.frame % SPRITE_INDEX.UP.throttle === 0) {
      this.frame = 0
      this.sprite = (this.sprite + 1) % SPRITE_INDEX.UP.frames
    }
  }

  public useAction() {
    this.player.y -= this.player.maxVelocity
    this._preventWallCollision()
    this.player.moveCommand?.execute()
  }

  public draw(canvasCtx: CanvasRenderingContext2D, offsetX: number) {
    this.update()

    canvasCtx.drawImage(
      this.player.image,
      SPRITE_SIZE * this.sprite,
      SPRITE_SIZE * SPRITE_INDEX.UP.posY,
      SPRITE_SIZE,
      SPRITE_SIZE,
      this.player.x + offsetX,
      this.player.y,
      this.player.radius * 2,
      this.player.radius * 2
    )
  }
}

class MoveDown extends MoveState {
  private update() {
    this.frame++

    if (this.frame % SPRITE_INDEX.DOWN.throttle === 0) {
      this.frame = 0
      this.sprite = (this.sprite + 1) % SPRITE_INDEX.DOWN.frames
    }
  }

  public useAction() {
    this.player.y += this.player.maxVelocity
    this._preventWallCollision()
    this.player.moveCommand?.execute()
  }
  public draw(canvasCtx: CanvasRenderingContext2D, offsetX: number) {
    this.update()

    canvasCtx.drawImage(
      this.player.image,
      SPRITE_SIZE * this.sprite,
      SPRITE_SIZE * SPRITE_INDEX.DOWN.posY,
      SPRITE_SIZE,
      SPRITE_SIZE,
      this.player.x + offsetX,
      this.player.y,
      this.player.radius * 2,
      this.player.radius * 2
    )
  }
}

export const STATE = {
  IDLE: Idle,
  BOMB: Bomb,
  LEFT: MoveLeft,
  UP: MoveUp,
  RIGHT: MoveRight,
  DOWN: MoveDown,
}
