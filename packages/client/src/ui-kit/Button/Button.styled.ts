import styled, { css } from 'styled-components'

import { Colors } from '../../tokens'

import { ButtonMode } from './ButtonTypes'

export interface SButtonProps {
  mode?: ButtonMode
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  content?: string
  type?: string
  disabled?: boolean
}

export const Button = styled.button<SButtonProps>`
  color: ${Colors.WHITE};
  font-size: 16px;
  line-height: 20px;
  font-weight: bold;
  text-align: center;
  border-radius: 4px;
  border: 2px solid ${Colors.YELLOW};
  padding: 6px 10px;
  min-width: 120px;
  transition: all 0.4s ease-in-out;

  &:focus {
    outline: none;
  }

  &:hover {
    opacity: 0.85;
  }

  &:disabled {
    opacity: 0.8;
  }

  ${({ mode }) =>
    mode === ButtonMode.MAIN &&
    css`
      background-color: ${Colors.YELLOW};
    `}

  ${({ mode }) =>
    mode === ButtonMode.OUTLINE &&
    css`
      color: ${Colors.WHITE};
      background-color: transparent;
    `}

    ${({ mode }) =>
    mode === ButtonMode.BIT &&
    css`
      color: ${Colors.WHITE};
      font-size: 48px;
      font-family: PressStart2P, Arial, sans-serif;
      text-shadow: 5px 5px ${Colors.GRAY};
    `}
`
