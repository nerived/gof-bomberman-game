import { FC } from 'react'
import { FieldAttributes } from 'formik'

import * as S from './FileField.styled'

export const FileField = ({
  content,
  field,
  form: { touched, errors },
  ...props
}: FieldAttributes<any>) => {
  return (
    <S.Label>
      <div>{content}</div>
      <S.Input {...field} {...props} />
      {touched[field.name] && errors[field.name] && (
        <div className="error">{errors[field.name]}</div>
      )}
    </S.Label>
  )
}
