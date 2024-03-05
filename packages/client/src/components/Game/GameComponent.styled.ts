import styled from 'styled-components'
import { Colors } from '../../tokens'

export const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  max-height: 728px;
`

export const Canvas = styled.canvas`
  display: block;
  background-color: ${Colors.WHITE};
`
