import { FC } from 'react'

import * as S from './Input.styled'

export type InputProps = JSX.IntrinsicElements['input']

export const Input: FC<InputProps> = props => {
  const { placeholder, type, ...rest } = props

  return <S.Input type={type || 'text'} placeholder={placeholder} {...rest} />
}
