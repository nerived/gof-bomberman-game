import { FC, useEffect } from 'react'
import styled from 'styled-components'

import { GameComponent } from '../components/Game/GameComponent'

import { Layout } from '../ui-kit'

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
    <Layout>
      <Main id={PAGE_ID}>
        <GameComponent />
      </Main>
    </Layout>
  )
}
