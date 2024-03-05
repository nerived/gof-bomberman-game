import { FC, useLayoutEffect, useRef } from 'react'
import { Bomberman } from './bomberman'
import { Canvas, Wrapper } from './GameComponent.styled'
import { useNavigate } from 'react-router-dom'
import { RoutesPaths } from '../../routes/constants'

export const GameComponent: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const navigate = useNavigate()

  useLayoutEffect(() => {
    if (!canvasRef.current) return

    const game = new Bomberman(canvasRef.current)

    game.willRestartHook = () => {
      const ans = confirm('continue?')

      if (ans) {
        game.play()
        return
      }

      navigate(RoutesPaths.Main)
    }

    game.didGameOverHook = _totalScore => {
      navigate(RoutesPaths.GameOver)
    }

    game.play()

    return () => {
      game.stop()
    }
  }, [])

  return (
    <Wrapper>
      <Canvas ref={canvasRef} />
    </Wrapper>
  )
}
