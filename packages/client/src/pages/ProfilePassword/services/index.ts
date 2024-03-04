import type { RootState } from '../../../store'

import { userFieldsConfig, UserField } from '../constants'

export const mapUserField = (user: RootState['user']) => {
  return userFieldsConfig.reduce((acc, item) => {
    const value = user[item.name as keyof Omit<RootState['user'], 'id'>]
    item.value = value ? String(value) : 'not set'
    acc.push(item)
    return acc
  }, [] as UserField[])
}
