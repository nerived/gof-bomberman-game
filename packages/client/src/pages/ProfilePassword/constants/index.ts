export type UserField = {
  label: string
  name: string
  value: string
  type: string
  placeholder: string
}

export const userFieldsConfig: UserField[] = [
  {
    label: 'Old Password',
    value: 'daw',
    type: 'password',
    name: 'oldPassword',
    placeholder: 'Old Password',
  },
  {
    label: 'New Password',
    value: '',
    type: 'password',
    name: 'newPassword',
    placeholder: 'New Password',
  },
  {
    label: 'Repeat new password',
    value: '',
    type: 'password',
    name: 'newPasswordRepeat',
    placeholder: 'Repeat new password',
  },
]
