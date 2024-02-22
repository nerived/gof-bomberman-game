import { FC } from 'react'
import styled from 'styled-components'
import { RoutesPaths } from './../routes/constants'
import { Button, Layout } from '../ui-kit'
import { Logo } from '../ui-kit/Logo/Logo.styled'

export const Item = styled.div`
  color: #fff;
`
export const Link = styled.a`
  color: #fff;
`
export const MainPage: FC = () => {
  return (
    <Layout title="Bomberman game">
      <Logo src="/logo.png" alt="bomberman logo" />

      <div style={{ marginTop: '40px' }}>
        <Button title="START" href={RoutesPaths.Game} type="8bit" />
      </div>

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
    </Layout>
  )
}
