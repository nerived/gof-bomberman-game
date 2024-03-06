export const validateEmail = (value: string) => {
  let error
  if (!value) {
    error = 'Обязательное поле'
    // eslint-disable-next-line no-useless-escape
  } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i.test(value)) {
    error =
      'Электронная почта может включать цифры и специальные символы, такие как дефисы и подчеркивания, после нее должна быть «собака» (@) и точка, но перед точкой должны быть буквы.'
  }
  return error
}
