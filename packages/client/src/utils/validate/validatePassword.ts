export const validatePassword = (value: string) => {
  let error
  if (!value) {
    error = 'Обязательное поле'
  } else if (!/^(?=.*[A-Z])(?=.*\d)[a-zA-Z0-9]{8,40}$/i.test(value)) {
    error =
      'Пароль содержит от 8 до 40 символов, необходима хотя бы одна заглавная буква и цифра.'
  }
  return error
}
