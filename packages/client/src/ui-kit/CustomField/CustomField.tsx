import { FC } from 'react'
import { FieldAttributes } from 'formik'

import * as S from './CustomField.styled'

export const CustomField = ({
  labelText,
  field,
  form: { touched, errors },
  ...props
}: FieldAttributes<any>) => {
  return (
    <S.CustomField>
      {labelText && <S.Label>{labelText}</S.Label>}
      <S.Input {...field} {...props} />
      {touched[field.name] && errors[field.name] && (
        <div className="error">{errors[field.name]}</div>
      )}
    </S.CustomField>
  )
}
