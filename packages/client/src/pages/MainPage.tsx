import { FC } from 'react'
import { LinkButton, LinkButtonMode, LayoutCentered } from '../ui-kit'

import { Logo } from '../ui-kit/Logo/Logo.styled'
import { RoutesPaths } from '../routes/constants'

export const MainPage: FC = () => {
  return (
    <LayoutCentered>
      <Logo src="/logo.png" alt="bomberman logo" />

      <div style={{ marginTop: '40px', textAlign: 'center' }}>
        <LinkButton
          content="START"
          to={RoutesPaths.Game}
          mode={LinkButtonMode.BIT}
        />
      </div>
    </LayoutCentered>
  )
}
