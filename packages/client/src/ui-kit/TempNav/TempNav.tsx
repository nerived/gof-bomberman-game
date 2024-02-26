import styled from 'styled-components'
import { RoutesPaths } from '../../routes/constants'

export const List = styled.div`
  display: flex;
  gap: 20px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
`
export const Item = styled.div`
  color: #fff;
`
export const Link = styled.a`
  color: #fff;
`

export const TempNav = () => {
  return (
    <List>
      {Object.keys(RoutesPaths).map(route => {
        const href = RoutesPaths[route as keyof typeof RoutesPaths]
        return (
          <Item>
            <Link href={href}>{route}</Link>
          </Item>
        )
      })}
    </List>
  )
}
