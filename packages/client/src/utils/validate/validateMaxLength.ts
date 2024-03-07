export const validateMaxLength = (value: string) => {
  let error
  if (value.trim().length > 240) {
    error = 'Описание не может быть больше 240 символов'
  }
  return error
}
