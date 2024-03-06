import {
  AuthorizedRoutesNav,
  NotAuthorizedRoutesNav,
  RoutesPaths,
} from '../../routes/constants'
import { useAuth } from '../../features/user/hooks/useAuth'

import { Header, List, Item, StyledLink } from './Nav.styled'

export const Nav = () => {
  const { isUserAuthenticated } = useAuth()

  const navRoutes = isUserAuthenticated
    ? AuthorizedRoutesNav
    : NotAuthorizedRoutesNav

  return (
    <Header>
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
    </Header>
  )
}
