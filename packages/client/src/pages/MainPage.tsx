import { FC } from 'react'
import styled from 'styled-components'
import { RoutesPaths } from './../routes/constants'
import { Button, ButtonMode, Layout } from '../ui-kit'
import { Logo } from '../ui-kit/Logo/Logo.styled'
import { ContainerFlex } from '../ui-kit/ContainerFlex/ContainerFlex.styled'

export const Item = styled.div`
  color: #fff;
`
export const Link = styled.a`
  color: #fff;
`

const MarginWrapper = styled.div`
  margin: 40px 0;
`

export const MainPage: FC = () => {
  return (
    <Layout>
      <ContainerFlex>
        <Logo src="/logo.png" alt="bomberman logo" />

        <MarginWrapper>
          <Button content="START" mode={ButtonMode.PIXEL} />
        </MarginWrapper>

        <div>
          {Object.keys(RoutesPaths).map(route => {
            const href = RoutesPaths[route as keyof typeof RoutesPaths]
            return (
              <Item>
                <Link href={href}>{route}</Link>
              </Item>
            )
          })}
        </div>
      </ContainerFlex>
    </Layout>
  )
}
