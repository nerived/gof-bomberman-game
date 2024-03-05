import styled from 'styled-components'

import { Colors } from '../../tokens'

export const Root = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgb(26 40 47 / 80%);
  z-index: 5;
`

export const Loader = styled.div`
  width: 48px;
  height: 48px;
  border: 5px solid ${Colors.YELLOW};
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
  }

  @keyframes rotation {
  0% {
      transform: rotate(0deg);
  }
  100% {
      transform: rotate(360deg);
  }
`
