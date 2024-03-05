import styled from 'styled-components'
import {
  AuthorizedRoutesNav,
  NotAuthorizedRoutesNav,
  RoutesPaths,
} from '../../routes/constants'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useAuth } from '../../features/user/hooks/useAuth'

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
  const { isUserAuthenticated } = useAuth()

  console.log('isUserAuthenticated', isUserAuthenticated)

  const navRoutes = isUserAuthenticated
    ? AuthorizedRoutesNav
    : NotAuthorizedRoutesNav

  return (
    <List>
      {Object.keys(navRoutes).map(route => {
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
