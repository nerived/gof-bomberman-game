import { FC, useEffect } from 'react'
import { GameComponent } from '../components/Game/GameComponent'
import styled from 'styled-components'
import { Colors } from '../tokens'

const PAGE_ID = 'game-page'

function preventDefault(e: Event) {
  e.preventDefault()
}

function toggleFullScreen() {
  const wrapper = document.getElementById(PAGE_ID)
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

const Main = styled.main`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${Colors.DEEP_DARK_BLUE};
`

export const GamePage: FC = () => {
  useEffect(() => {
    globalThis.addEventListener('keydown', fullScreenOnFkey)
    globalThis.addEventListener('beforeunload', preventDefault)

    return () => {
      globalThis.removeEventListener('keydown', fullScreenOnFkey)
      globalThis.removeEventListener('beforeunload', preventDefault)
    }
  }, [])

  return (
    <Main id={PAGE_ID}>
      <GameComponent />
    </Main>
  )
}
