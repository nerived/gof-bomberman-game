export const validateLogin = (value: string) => {
  let error
  if (!value) {
    error = 'Обязательное поле'
  } else if (!/^(?!\\d+$)([a-zA-Z0-9_-]{3,20})$/i.test(value)) {
    error =
      'Логин содержит от 3 до 20 символов, латиница, может содержать цифры, но не состоит из них, без пробелов, без специальных символов (допускаются дефис и подчеркивание)'
  }
  return error
}
