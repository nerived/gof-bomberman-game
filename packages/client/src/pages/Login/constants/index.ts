import { validate } from '../../../utils'
export const loginFields = [
  {
    id: 'login',
    name: 'login',
    type: 'text',
    placeholder: 'Логин',
    required: true,
    validate: validate.validateNotEmpty,
  },

  {
    id: 'password',
    name: 'password',
    type: 'password',
    placeholder: 'Пароль',
    required: true,
    validate: validate.validateNotEmpty,
  },
]
