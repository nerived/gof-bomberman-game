import styled from 'styled-components'
import { Colors } from '../../tokens'

export const Popup = styled.div`
  position: absolute;
  inset: 0;
  color: ${Colors.WHITE};
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`

export const Overlay = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background: rgb(26 40 47 / 80%);
`

export const Content = styled.div`
  border-radius: 12px;
  background: ${Colors.MAIN_BG};
  min-width: 340px;
  padding: 40px 30px;
  position: relative;
  box-shadow: 0 0 6px 0 ${Colors.YELLOW};
  max-width: 760px;
`

export const Close = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  border: 1px solid ${Colors.YELLOW};
  border-radius: 4px;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  flex-shrink: 0;
  color: ${Colors.YELLOW};
`
