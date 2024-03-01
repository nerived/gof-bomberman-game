import styled from 'styled-components'
import { RoutesPaths } from '../../routes/constants'
import { Link } from 'react-router-dom'

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
export const StyledLink = styled(Link)`
  color: #fff;
  text-decoration: none; // Optional: Removes underline from links
`

export const TempNav = () => {
  return (
    <List>
      {Object.keys(RoutesPaths).map(route => {
        const href = RoutesPaths[route as keyof typeof RoutesPaths]
        return (
          <Item key={href}>
            <Link to={href}>{route}</Link>
          </Item>
        )
      })}
    </List>
  )
}
