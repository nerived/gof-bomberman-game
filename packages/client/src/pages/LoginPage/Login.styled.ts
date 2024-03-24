import styled from 'styled-components'
import { Colors } from '../../tokens'

export const Content = styled.div`
  width: 80vw;
  max-width: 500px;
  margin: 0 auto;
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

export const Error = styled.div`
  color: ${Colors.TERRACOTTA};
`
