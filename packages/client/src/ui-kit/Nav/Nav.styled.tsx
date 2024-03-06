import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Header = styled.header`
  margin: 0 auto;
  overflow-x: auto;
  max-width: 100%;
  flex-shrink: 0;
`

export const List = styled.ul`
  display: flex;
  gap: 40px;
  list-style: none;
  padding: 16px;
`
export const Item = styled.li`
  color: #fff;
`
export const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-family: PressStart2P, Arial, sans-serif;
`
