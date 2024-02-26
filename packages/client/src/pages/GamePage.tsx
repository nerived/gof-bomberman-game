import { FC } from 'react'
import { GameComponent } from '../components/Game/GameComponent'
import styled from 'styled-components'
import { Colors } from '../tokens'

const Main = styled.main`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${Colors.DEEP_DARK_BLUE};
`

export const GamePage: FC = () => {
  return (
    <Main>
      <GameComponent />
    </Main>
  )
}
