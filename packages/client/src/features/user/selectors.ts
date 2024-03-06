import { RootState } from '../../store'

export const getUser = (state: RootState) => {
  return state.user
}
