import { FC } from 'react'
import { Button, PageContainer } from '../ui-kit'
import { Logo } from '../ui-kit/Logo/Logo.styled'
import { RoutesPaths } from '../routes/constants'

export const MainPage: FC = () => {
  return (
    <PageContainer>
      <Logo src="/logo.png" alt="bomberman logo" />

      <div style={{ marginTop: '40px' }}>
        <Button title="START" href={RoutesPaths.Game} type="8bit" />
      </div>
    </PageContainer>
  )
}
