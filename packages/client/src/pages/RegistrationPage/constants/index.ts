export type UserField = {
  labelText: string
  name: string
}

export const userFieldsConfig: UserField[] = [
  {
    labelText: 'Почта',
    name: 'email',
  },
  {
    labelText: 'Логин',
    name: 'login',
  },

  {
    labelText: 'Имя',
    name: 'first_name',
  },

  {
    labelText: 'Фамилия',
    name: 'second_name',
  },

  {
    labelText: 'Телефон',
    name: 'phone',
  },
  {
    labelText: 'Пароль',
    name: 'password',
  },
]
