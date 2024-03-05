export const validateNotEmpty = (value: string) => {
  let error
  if (!value) {
    error = 'Обязательное поле'
  }

  return error
}
