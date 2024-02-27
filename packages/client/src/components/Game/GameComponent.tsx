import { FC, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Bomberman } from './bomberman'
import styled from 'styled-components'
import { Colors } from '../../tokens'

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  max-height: 728px;
`

const Canvas = styled.canvas`
  display: block;
  background-color: ${Colors.WHITE};
`

export const GameComponent: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useLayoutEffect(() => {
    if (!canvasRef.current) return

    const game = new Bomberman(canvasRef.current)
    game.start()

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
