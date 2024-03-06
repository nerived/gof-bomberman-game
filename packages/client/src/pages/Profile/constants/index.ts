export type UserField = {
  label: string
  name: string
  value: string
}

export const userFieldsConfig: UserField[] = [
  {
    label: 'Почта',
    name: 'email',
    value: '',
  },
  {
    label: 'Логин',
    name: 'login',
    value: '',
  },
  {
    label: 'Имя',
    name: 'first_name',
    value: '',
  },
  {
    label: 'Фамилия',
    name: 'second_name',
    value: '',
  },
  {
    label: 'Отображаемое имя',
    name: 'display_name',
    value: '',
  },
  {
    label: 'Телефон',
    name: 'phone',
    value: '',
  },
]
