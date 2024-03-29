import { FC } from 'react'
import { FastField } from 'formik'

import { RowInput, RowInputProps } from '../RowInput'
import * as S from './RowValue.styled'

export type RowValueProps = RowInputProps & {
  value: string
  isEditable?: boolean
}

export const RowValue: FC<RowValueProps> = props => {
  const { value = 'not set', isEditable, ...inputProps } = props
  return (
    <S.RowValue>
      {isEditable ? <FastField {...inputProps} component={RowInput} /> : value}
    </S.RowValue>
  )
}
