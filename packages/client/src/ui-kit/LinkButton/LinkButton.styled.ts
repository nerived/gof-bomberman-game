import styled, { css } from 'styled-components'
import { Colors } from '../../tokens'

import { LinkButtonMode } from './LinkButtonTypes'

export interface LinkButtonProps {
  mode?: LinkButtonMode
  content?: string
  href: string
}

export const LinkButton = styled.a<LinkButtonProps>`
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
  display: inline-block;

  &:focus {
    outline: none;
  }

  &:hover {
    opacity: 0.85;
  }

  ${({ mode }) =>
    mode === LinkButtonMode.MAIN &&
    css`
      background-color: ${Colors.YELLOW};
    `}

  ${({ mode }) =>
    mode === LinkButtonMode.OUTLINE &&
    css`
      color: ${Colors.WHITE};
      background-color: transparent;
    `}
`
