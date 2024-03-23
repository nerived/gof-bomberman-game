import { FieldAttributes } from 'formik'

import * as S from './CustomField.styled'

export const CustomField = ({
  labelText,
  field,
  asTextArea,
  form: { touched, errors },
  ...props
}: FieldAttributes<any>) => {
  let error = ''

  if (touched && errors) {
    error =
      touched[field?.name || props.name] && errors[field?.name || props.name]
  }

  return (
    <S.CustomField>
      {labelText && <S.Label>{labelText}</S.Label>}
      {asTextArea ? (
        <S.TextArea
          minLength={250}
          maxLength={250}
          rows={6}
          cols={6}
          $hasError={!!error}
          {...field}
          {...props}
        />
      ) : (
        <S.Input $hasError={!!error} {...field} {...props} />
      )}
      {error && <S.Error>{errors[field?.name || props.name]}</S.Error>}
    </S.CustomField>
  )
}
