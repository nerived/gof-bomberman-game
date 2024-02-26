import { FC } from 'react'

import * as S from './RowInput.styled'

export type RowInputProps = JSX.IntrinsicElements['input']

export const RowInput: FC<RowInputProps> = props => {
  const { placeholder, type, ...rest } = props

  return (
    <S.RowInput type={type || 'text'} placeholder={placeholder} {...rest} />
  )
}
