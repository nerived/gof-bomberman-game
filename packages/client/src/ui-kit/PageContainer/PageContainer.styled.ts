import styled from 'styled-components'
import { Colors } from '../../tokens'

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;

  width: 100%;
  height: 100%;

  background-color: ${Colors.BLACK};

  padding: 30px;
`

export const Inner = styled.div`
  margin: 0 auto;
`
