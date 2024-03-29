import { circleVsRectCollision, potentialPositions } from '../../_lib'
import { PlayerUnit } from './player.unit'

export abstract class PlayerState {
  constructor(protected readonly player: PlayerUnit) {}

  public abstract useAction(): void
}

class Idle extends PlayerState {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public useAction() {}
}

class Bomb extends PlayerState {
  public useAction() {
    if (this.player.bombAmmo == 0) return
    this.player.plantBombCommand?.execute()
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
}

class MoveLeft extends MoveState {
  public useAction() {
    this.player.x -= this.player.maxVelocity
    this._preventWallCollision()
    this.player.moveCommand?.execute()
  }
}

class MoveUp extends MoveState {
  public useAction() {
    this.player.y -= this.player.maxVelocity
    this._preventWallCollision()
    this.player.moveCommand?.execute()
  }
}

class MoveRight extends MoveState {
  public useAction() {
    this.player.x += this.player.maxVelocity
    this._preventWallCollision()
    this.player.moveCommand?.execute()
  }
}

class MoveDown extends MoveState {
  public useAction() {
    this.player.y += this.player.maxVelocity
    this._preventWallCollision()
    this.player.moveCommand?.execute()
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
