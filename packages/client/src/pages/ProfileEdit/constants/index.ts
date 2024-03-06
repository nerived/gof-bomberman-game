import { validate } from '../../../utils'

export type UserField = {
  label: string
  name: string
  value: string
  validate?: (value: string) => string | undefined
}

export const userFieldsConfig: UserField[] = [
  {
    label: 'Почта',
    name: 'email',
    value: '',
    validate: validate.validateEmail,
  },
  {
    label: 'Логин',
    name: 'login',
    value: '',
    validate: validate.validateLogin,
  },
  {
    label: 'Имя',
    name: 'first_name',
    value: '',
    validate: validate.validateFirstName,
  },
  {
    label: 'Фамилия',
    name: 'second_name',
    value: '',
    validate: validate.validateSecondName,
  },
  {
    label: 'Отображаемое имя',
    name: 'display_name',
    value: '',
    validate: validate.validateNotEmpty,
  },
  {
    label: 'Телефон',
    name: 'phone',
    value: '',
    validate: validate.validatePhone,
  },
]
