import { NextLevelCommand } from './next-level'
import { Bomberman } from '..'

describe('NextLevelCommand', () => {
  let gameMock: Partial<Bomberman>
  let nextLevelCommand: NextLevelCommand

  beforeEach(() => {
    gameMock = {
      nextLevel: jest.fn(),
    }

    nextLevelCommand = new NextLevelCommand(gameMock as Bomberman)
  })

  test('execute calls game.nextLevel', () => {
    nextLevelCommand.execute()

    expect(gameMock.nextLevel).toHaveBeenCalled()
  })
})
