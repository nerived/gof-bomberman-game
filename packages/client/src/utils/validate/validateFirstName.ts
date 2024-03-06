export const validateFirstName = (value: string) => {
  let error
  console.log('validateFirstName value', value)
  console.log(
    'validateFirstName value test',
    !/^(?:[A-ZА-ЯЁ][a-zа-яё]*)(?:-[A-ZА-ЯЁ][a-zа-яё]*)*$/i.test(value)
  )
  if (!value) {
    error = 'Обязательное поле'
  } else if (!/^[A-ZА-ЯЁ][a-zа-яё-]*$/.test(value)) {
    error =
      'Имя должно начинаться с заглавной буквы, без пробелов, цифр и специальных символов (допускается только дефис).'
  }
  return error
}
