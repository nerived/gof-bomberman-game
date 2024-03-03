export type UserField = {
  label: string
  key: string
  value: string
}

export const userFieldsConfig: UserField[] = [
  {
    label: 'Почта',
    key: 'email',
    value: '',
  },
  {
    label: 'Логин',
    key: 'login',
    value: '',
  },
  {
    label: 'Имя',
    key: 'first_name',
    value: '',
  },
  {
    label: 'Фамилия',
    key: 'second_name',
    value: '',
  },
  {
    label: 'Отображаемое имя',
    key: 'display_name',
    value: '',
  },
  {
    label: 'Телефон',
    key: 'phone',
    value: '',
  },
]
