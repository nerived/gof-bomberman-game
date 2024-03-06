import { FC } from 'react'
import styled from 'styled-components'
import { RoutesPaths } from './../routes/constants'
import { Layout, LinkButton, LinkButtonMode } from '../ui-kit'
import { PixelText } from '../ui-kit/helpers/BaseStyles.styled'

const ContainerFlex = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 300px;
  gap: 64px;
`

const GameOverText = styled.h1`
  ${PixelText}
`

export const GameOverPage: FC = () => {
  return (
    <Layout>
      <ContainerFlex>
        <GameOverText>GAME OVER</GameOverText>
        <LinkButton
          mode={LinkButtonMode.BIT}
          to={RoutesPaths.Main}
          content="GO TO THE MAIN MENU"
        />
      </ContainerFlex>
    </Layout>
  )
}
