import styled from 'styled-components'
import { Colors } from '../../tokens'

export const Label = styled.label`
  display: inline-block;

  margin: 0 auto;
  border: 2px solid ${Colors.TERRACOTTA};
`

export const Input = styled.input`
  padding: 5px;
  margin: 0;
  outline: none;
  border: none;

  background-color: ${Colors.BLACK};
  color: ${Colors.WHITE};

  width: 300px;

  &::placeholder {
    color: inherit;
    opacity: 0.7;
  }
`
