import styled from 'styled-components'
import { Colors } from '../../tokens'

export const Root = styled.div`
  padding: 32px 0;
`

export const Content = styled.div`
  max-width: 600px;
  margin: 0 auto;
`

export const Error = styled.div`
  color: ${Colors.TERRACOTTA};
  margin-bottom: 10px;
`

export const Actions = styled.div`
  margin-top: 48px;
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
