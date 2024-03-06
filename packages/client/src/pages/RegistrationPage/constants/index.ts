import { validate } from '../../../utils'

export type UserField = {
  labelText: string
  name: string
  type?: string
  validate: (value: string) => string | undefined
}

export const userFieldsConfig: UserField[] = [
  {
    labelText: 'Почта',
    name: 'email',
    validate: validate.validateEmail,
  },
  {
    labelText: 'Логин',
    name: 'login',
    validate: validate.validateLogin,
  },

  {
    labelText: 'Имя',
    name: 'first_name',
    validate: validate.validateFirstName,
  },

  {
    labelText: 'Фамилия',
    name: 'second_name',
    validate: validate.validateSecondName,
  },

  {
    labelText: 'Телефон',
    name: 'phone',
    validate: validate.validatePhone,
  },
  {
    labelText: 'Пароль',
    name: 'password',
    type: 'password',
    validate: validate.validatePassword,
  },
]
