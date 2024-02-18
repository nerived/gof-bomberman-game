import styled, { css } from 'styled-components'
import { Colors } from '../../tokens'

interface ButtonProps {
  type?: string
}

export const Button = styled.a<ButtonProps>`
  margin: 0 auto;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${Colors.BLACK};
  border: none;
  outline: none;
  background: none;
  border-radius: 30px;

  font-weight: bold;
  width: fit-content;
  height: fit-content;
  min-width: 200px;
  min-height: 50px;

  transition: all 0.4s ease-in-out;

  &:focus {
    outline: none;
  }

  ${({ type }) =>
    type === 'main' &&
    css`
      background-color: ${Colors.YELLOW};
    `}

  ${({ type }) =>
    type === 'outline' &&
    css`
      color: ${Colors.WHITE};
      background-color: transparent;
      border: 2px solid ${Colors.YELLOW};
    `}

    ${({ type }) =>
    type === '8bit' &&
    css`
      color: ${Colors.WHITE};
      font-size: 48px;
      font-family: PressStart2P, Arial, sans-serif;
      text-shadow: 5px 5px ${Colors.GRAY};
    `}
`
