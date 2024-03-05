import styled from 'styled-components'
import {
  AuthorizedRoutesNav,
  NotAuthorizedRoutesNav,
  RoutesPaths,
} from '../../routes/constants'
import { Link } from 'react-router-dom'
import { useAuth } from '../../features/user/hooks/useAuth'

export const List = styled.ul`
  display: flex;
  gap: 40px;
  list-style: none;
  padding: 32px 16px 16px;
  margin: 0 auto;
`
export const Item = styled.li`
  color: #fff;
`
export const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-family: PressStart2P, Arial, sans-serif;
`

export const TempNav = () => {
  const { isUserAuthenticated } = useAuth()

  const navRoutes = isUserAuthenticated
    ? AuthorizedRoutesNav
    : NotAuthorizedRoutesNav

  return (
    <List>
      {Object.keys(navRoutes).map(route => {
        const href = RoutesPaths[route as keyof typeof RoutesPaths]
        return (
          <Item key={href}>
            <StyledLink to={href}>{route}</StyledLink>
          </Item>
        )
      })}
    </List>
  )
}
