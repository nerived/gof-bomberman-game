import { validate } from '../../../utils'

export type UserField = {
  label: string
  name: string
  value: string
  type: string
  placeholder: string
  validate?: (value: string) => string | undefined
}

export const userFieldsConfig: UserField[] = [
  {
    label: 'Старый пароль',
    value: '',
    type: 'password',
    name: 'oldPassword',
    placeholder: 'Старый пароль',
    validate: validate.validateNotEmpty,
  },
  {
    label: 'Новый паролль',
    value: '',
    type: 'password',
    name: 'newPassword',
    placeholder: 'Новый паролль',
    validate: validate.validatePassword,
  },
]
