import type { RootState } from '../../../store'

import { userFieldsConfig, UserField } from '../constants'

export const mapUserField = (user: RootState['user']) => {
  return userFieldsConfig.reduce((acc, item) => {
    item.value =
      user[item.key as keyof Omit<RootState['user'], 'id'>] || 'not set'
    acc.push(item)
    return acc
  }, [] as UserField[])
}
