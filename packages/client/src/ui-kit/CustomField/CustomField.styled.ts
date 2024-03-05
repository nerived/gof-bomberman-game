import styled from 'styled-components'
import { Colors } from '../../tokens'

export const CustomField = styled.div`
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
`

export const Label = styled.label`
  font-size: 16px;
  line-height: 20px;
  margin-bottom: 10px;
  color: ${Colors.WHITE};
`

export const Input = styled.input`
  padding: 0 5px;
  margin: 0;
  outline: none;
  height: 36px;
  font-size: 16px;
  line-height: 20px;
  border-radius: 2px;
  border: 2px solid ${Colors.TERRACOTTA};
  background-color: ${Colors.MAIN_BG};
  color: ${Colors.WHITE};
  width: 100%;

  &::placeholder {
    color: inherit;
    opacity: 0.7;
  }
`
