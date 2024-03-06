export const validateSecondName = (value: string) => {
  let error
  if (!value) {
    error = 'Обязательное поле'
  } else if (!/^[A-ZА-ЯЁ][a-zа-яё-]*$/.test(value)) {
    error =
      'Фамилия должна начинаться с заглавной буквы, без пробелов, цифр и специальных символов (допускается только дефис).'
  }
  return error
}
