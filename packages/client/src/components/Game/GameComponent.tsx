import { FC, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Bomberman } from './bomberman/bomberman'
import styled from 'styled-components'
import { Colors } from '../../tokens'

function toggleFullScreen() {
  const wrapper = document.querySelector('main')
  if (wrapper && !document.fullscreenElement) {
    wrapper.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
}

function fullScreenOnFkey(e: KeyboardEvent) {
  const { code } = e

  if (code === 'KeyF') {
    toggleFullScreen()
  }
}

const Wrapper = styled.section`
  width: 1280px;
  height: 100%;
  max-height: 728px;
`

const Canvas = styled.canvas`
  display: block;
  width: 100%;
  height: 100%;
  background-color: ${Colors.WHITE};
`

export const GameComponent: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [screenWidth, updateWidth] = useState(globalThis.innerWidth)
  const [screenHeight, updateHeight] = useState(globalThis.innerHeight)

  useEffect(() => {
    const onScreenResize = () => {
      updateWidth(globalThis.innerWidth)
      updateHeight(globalThis.innerHeight)
    }

    globalThis.addEventListener('keydown', fullScreenOnFkey)
    globalThis.addEventListener('resize', onScreenResize)

    return () => {
      globalThis.removeEventListener('resize', onScreenResize)
      globalThis.removeEventListener('keydown', fullScreenOnFkey)
    }
  })

  useLayoutEffect(() => {
    if (!canvasRef.current) return

    const game = new Bomberman(canvasRef.current)
    game.start()

    return () => {
      game.stop()
    }
  }, [])

  const { width, height } = Bomberman.computeGameLayout(
    screenWidth,
    screenHeight
  )

  return (
    <Wrapper style={{ width, height }}>
      <Canvas ref={canvasRef} />
    </Wrapper>
  )
}
