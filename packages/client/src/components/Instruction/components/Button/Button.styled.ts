import styled, { css } from 'styled-components'

import { Colors } from '../../../../tokens'

export type SButtonProps = {
  rotate?: number
  isImg?: boolean
}

export const Button = styled.div<SButtonProps>`
  border: 2px solid ${Colors.YELLOW};
  border-radius: 4px;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
  font-weight: 500;
  flex-shrink: 0;
  color: ${Colors.YELLOW};

  ${({ rotate = 0 }) =>
    css`
      transform: rotate(${rotate}deg);
    `}
  ${({ isImg = false }) => {
    return isImg
      ? css`
          border-color: transparent;
        `
      : ``
  }}
`
