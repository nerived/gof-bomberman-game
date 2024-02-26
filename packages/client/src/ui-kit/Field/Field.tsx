import { FC } from 'react'

import * as S from './Field.styled'
import { Input, InputProps } from '../Input'

export type FieldProps = InputProps & {
  errorMessage?: string
}

export const Field: FC<FieldProps> = props => {
  const { errorMessage, ...rest } = props

  return (
    <S.Field>
      <Input {...rest} />
    </S.Field>
  )
}
