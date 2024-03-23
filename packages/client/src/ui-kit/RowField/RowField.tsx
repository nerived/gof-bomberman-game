import { FC } from 'react'

import { RowLabel } from './components/RowLabel'
import { RowValue, RowValueProps } from './components/RowValue'

import * as S from './RowField.styled'

export type RowFieldProps = RowValueProps & {
  label: string
  value: string
  name: string
  isEditable?: boolean
  hasError?: boolean
}

export const RowField: FC<RowFieldProps> = props => {
  const { label, value, isEditable, hasError = false, ...inputProps } = props
  return (
    <S.RowField $hasError={hasError}>
      <RowLabel label={label} />
      <RowValue value={value} isEditable={isEditable} {...inputProps} />
    </S.RowField>
  )
}
