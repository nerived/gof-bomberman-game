import styled, { css } from 'styled-components'
import { Colors } from '../../tokens'

export const RowField = styled.div<{ hasError: boolean }>`
  display: flex;
  color: ${Colors.WHITE};
  border-bottom: 1px solid ${Colors.YELLOW};
  margin-bottom: 10px;
  font-size: 16px;
  line-height: 32px;

  ${({ hasError }) =>
    hasError &&
    css`
      border-color: ${Colors.TERRACOTTA};
    `}
`
