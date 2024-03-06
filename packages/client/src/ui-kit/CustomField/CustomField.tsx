import React from 'react'
import { FieldAttributes } from 'formik'

import * as S from './CustomField.styled'

export const CustomField = ({
  labelText,
  field,
  form: { touched, errors },
  ...props
}: FieldAttributes<any>) => {
  const error = touched[field.name] && errors[field.name]
  return (
    <S.CustomField>
      {labelText && <S.Label>{labelText}</S.Label>}
      <S.Input {...field} {...props} hasError={!!error} />
      {error && <S.Error>{errors[field.name]}</S.Error>}
    </S.CustomField>
  )
}
