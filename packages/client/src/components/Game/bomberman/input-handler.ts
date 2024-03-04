import { ICommand } from './basics/command'
import { TAction } from './units/player/player.unit'

export const KeyCode = {
  ArrowLeft: 'LEFT',
  ArrowUp: 'UP',
  ArrowRight: 'RIGHT',
  ArrowDown: 'DOWN',
  KeyB: 'BOMB',
} as const

const isServeCode = (code: string): code is keyof typeof KeyCode => {
  return Reflect.has(KeyCode, code)
}

export class InputHandler {
  private _actionList: TAction[] = []
  private _command: ICommand | undefined

  get actionList() {
    return [...this._actionList]
  }

  public setCommand(cmd: ICommand) {
    this._command = cmd
  }

  private _onKeyDown = (e: KeyboardEvent) => {
    const { code: keyDownCode } = e

    if (
      !isServeCode(keyDownCode) ||
      ~this._actionList.indexOf(KeyCode[keyDownCode])
    ) {
      return
    }

    this._actionList.push(KeyCode[keyDownCode])

    this._command?.execute()
  }

  private _onKeyUp = (e: KeyboardEvent) => {
    const { code: keyUpCode } = e

    if (!Reflect.has(KeyCode, keyUpCode) || !isServeCode(keyUpCode)) return

    let isMakeExclude = false

    this._actionList = this._actionList.filter(pressedKey => {
      if (pressedKey === KeyCode[keyUpCode]) {
        isMakeExclude = true
      }
      return pressedKey !== KeyCode[keyUpCode]
    })

    if (!isMakeExclude) return

    this._command?.execute()
  }

  private _addListeners() {
    globalThis.addEventListener('keydown', this._onKeyDown)
    globalThis.addEventListener('keyup', this._onKeyUp)
  }

  private _removeListeners() {
    globalThis.removeEventListener('keydown', this._onKeyDown)
    globalThis.removeEventListener('keyup', this._onKeyUp)
  }

  private _resetActionList() {
    this._actionList = []
  }

  public start() {
    this._resetActionList()
    this._addListeners()
  }

  public stop() {
    this._resetActionList()
    this._removeListeners()
  }
}
