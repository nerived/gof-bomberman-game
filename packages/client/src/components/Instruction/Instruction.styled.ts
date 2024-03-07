import styled from 'styled-components'

export const Content = styled.div``

export const H3 = styled.h3`
  margin-bottom: 16px;
  margin-top: 24px;
  font-family: PressStart2P, Arial, sans-serif;

  &:first-child {
    margin-top: 0;
  }
`

export const P = styled.p`
  margin-bottom: 8px;
`

export const List = styled.ul`
  padding: 0;
  list-style: none;
  margin-bottom: 8px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`

export const ListItem = styled.li`
  list-style: none;
  display: flex;
  flex-basis: 49%;
`

export const Descr = styled.div`
  padding-top: 7px;
  margin-left: 12px;
`
