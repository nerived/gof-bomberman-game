export const validatePhone = (value: string) => {
  let error
  if (!value) {
    error = 'Обязательное поле'
  } else if (!/^\+?\d{10,15}$/i.test(value)) {
    error =
      'Номер телефона содержит от 10 до 15 символов, состоит из цифр, может начинаться с плюса.'
  }
  return error
}
