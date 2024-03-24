import { styled, css } from 'styled-components'
import { Colors } from '../../tokens'

export const Root = styled.div<{ $isOpen: boolean }>`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(26, 31, 39, 0.75);
  visibility: hidden;
  opacity: 0;
  transition: all 0.25s ease-in-out;
  z-index: 100000;
  color: ${Colors.YELLOW};
  ${({ $isOpen }) =>
    $isOpen &&
    css`
      opacity: 1;
      visibility: visible;
    `}
`

export const ModalBody = styled.div<{ $isOpen: boolean }>`
  width: 600px;
  min-height: 110px;
  display: block;
  margin: 50% 0 0 -300px;
  position: relative;
  top: 50%;
  left: 50%;
  background: ${Colors.ELEVATION};
  opacity: 0;
  transition: all 0.5s ease-in-out;
  ${({ $isOpen }) =>
    $isOpen &&
    css`
      margin-top: -200px;
      opacity: 1;
    `}
`

export const Head = styled.div`
  width: 100%;
  height: 64px;
  overflow: hidden;
  background: ${Colors.MAIN_BG};
  position: relative;
  padding: 12px 52px 12px 24px;
  font-size: 30px;
`

export const CloseBtn = styled.span`
  width: 32px;
  height: 32px;
  display: block;
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translate(0, -50%);
  cursor: pointer;

  &:hover::before,
  &:hover::after {
    background-color: ${Colors.YELLOW};
  }

  &::before,
  &::after {
    content: '';
    width: 32px;
    height: 6px;
    display: block;
    background: ${Colors.WHITE};
  }

  &::before {
    margin-top: 12px;
    transform: rotate(45deg);
  }

  &::after {
    margin-top: -6px;
    transform: rotate(-45deg);
  }
`

export const Content = styled.div`
  padding: 12px 24px;
`
