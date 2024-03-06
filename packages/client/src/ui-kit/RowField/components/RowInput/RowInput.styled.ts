import styled from 'styled-components'
import { Colors } from '../../../../tokens'

export const RowInputRoot = styled.div`
  flex: 1;
`

export const RowInput = styled.input`
  padding: 0 5px;
  margin: 0;
  outline: none;
  height: 32px;
  font-size: 16px;
  border-radius: 2px;
  border: none;
  text-align: right;
  background-color: ${Colors.MAIN_BG};
  color: ${Colors.WHITE};
  width: 100%;

  &::placeholder {
    color: inherit;
    opacity: 0.7;
  }
`

export const Error = styled.div`
  font-size: 12px;
  line-height: 1;
  color: ${Colors.TERRACOTTA};
  padding-bottom: 3px;
`
