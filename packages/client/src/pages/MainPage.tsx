import { FC } from 'react'
import styled from 'styled-components'
import { LinkButton, LinkButtonMode, LayoutCentered } from '../ui-kit'

import { Logo } from '../ui-kit/Logo/Logo.styled'
import { RoutesPaths } from '../routes/constants'

const MarginWrapper = styled.div`
  margin: 40px 0;
  text-align: center;
`

const LogoWrapper = styled.div`
  margin-top: 160px;
`

export const MainPage: FC = () => {
  return (
    <LayoutCentered>
      <LogoWrapper>
        <Logo src="/logo.png" alt="bomberman logo" />
      </LogoWrapper>

      <MarginWrapper>
        <LinkButton
          content="START"
          to={RoutesPaths.Game}
          mode={LinkButtonMode.BIT}
        />
      </MarginWrapper>
    </LayoutCentered>
  )
}
