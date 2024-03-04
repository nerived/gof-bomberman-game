import React from 'react'
import { FieldAttributes } from 'formik'

import * as S from './RowInput.styled'

export type RowInputProps = JSX.IntrinsicElements['input']

export const RowInput = ({
  field,
  form: { touched, errors },
  ...props
}: FieldAttributes<any>) => {
  return (
    <S.RowInputRoot>
      <S.RowInput {...field} {...props} />
      {touched[field.name] && errors[field.name] && (
        <div className="error">{errors[field.name]}</div>
      )}
    </S.RowInputRoot>
  )
}
