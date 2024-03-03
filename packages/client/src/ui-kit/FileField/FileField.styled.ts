import styled from 'styled-components'
import { Colors } from '../../tokens'

export const FileField = styled.div`
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
`

export const Label = styled.label`
  color: ${Colors.WHITE};
  text-align: center;
  font-size: 16px;
  line-height: 20px;
  text-decoration-line: underline;
  margin-bottom: 20px;
  cursor: pointer;
`

export const Input = styled.input`
  display: none;
`
