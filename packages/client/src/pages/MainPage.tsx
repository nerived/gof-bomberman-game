import { FC } from 'react'
import styled from 'styled-components'

import { RoutesPaths } from './../routes/constants'

export const Item = styled.div`
  color: #fff;
`
export const Link = styled.a`
  color: #fff;
`
export const MainPage: FC = () => {
  return (
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
  )
}
