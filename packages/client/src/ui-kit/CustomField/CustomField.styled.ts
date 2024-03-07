import styled, { css } from 'styled-components'
import { Colors } from '../../tokens'

export const CustomField = styled.div`
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
`

export const Label = styled.label`
  display: inline-block;
  font-size: 16px;
  line-height: 20px;
  margin-bottom: 6px;
  color: ${Colors.WHITE};
`

const defaultFieldStyles = css`
  padding: 0 5px;
  margin: 0;
  outline: none;
  height: 36px;
  font-size: 16px;
  line-height: 20px;
  border-radius: 2px;
  border: 2px dotted ${Colors.YELLOW};
  background-color: ${Colors.MAIN_BG};
  color: ${Colors.WHITE};
  width: 100%;

  &::placeholder {
    color: inherit;
    opacity: 0.7;
  }
`

export const Input = styled.input<{ hasError: boolean }>`
  ${defaultFieldStyles}
  ${({ hasError }) =>
    hasError &&
    css`
      border-color: ${Colors.TERRACOTTA};
    `}
`

export const TextArea = styled.textarea<{ hasError: boolean }>`
  ${defaultFieldStyles}

  min-width: 100%;
  max-width: 100%;
  height: 150px;
  resize: none;

  ${({ hasError }) =>
    hasError &&
    css`
      border-color: ${Colors.TERRACOTTA};
    `}
`

export const Error = styled.div`
  font-size: 14px;
  line-height: 16px;
  color: ${Colors.TERRACOTTA};
`
