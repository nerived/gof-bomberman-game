import styled from 'styled-components'

export const Content = styled.div`
  min-width: 300px;
`

export const Actions = styled.div`
  margin-top: 36px;
  display: flex;
  flex-direction: column;
`

export const Action = styled.div`
  margin-bottom: 12px;
  display: flex;
  flex-direction: column;

  &:last-child {
    margin-bottom: 0;
  }
`
