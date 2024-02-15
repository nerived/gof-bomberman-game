import { FC } from 'react'

import * as S from './Input.styled'

export type InputProps = {
  errorMessage?: string
} & JSX.IntrinsicElements['input']

export const Input: FC<InputProps> = props => {
  const { placeholder, errorMessage, type, ...rest } = props

  return (
    <S.Label>
      <S.Input type={type || 'text'} placeholder={placeholder} {...rest} />
    </S.Label>
  )
}
