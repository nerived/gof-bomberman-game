import AuthAPI, { SigninData } from '../../api/AuthAPI'

import { updateUser, resetUser, setLoading, setAuthentication } from './reducer'

export const userLogin = (data: SigninData): any => {
  return async (dispatch: any) => {
    try {
      await AuthAPI.signin(data)
      dispatch(fetchUser())
    } catch (e) {
      console.log('error', e)
    }
  }
}

export const userLogout = (): any => {
  return (dispatch: any) => {
    try {
      AuthAPI.logout()
      dispatch(resetUser())
    } catch (e) {
      console.log('error', e)
    }
  }
}

export const fetchUser = (): any => {
  return async (dispatch: any) => {
    dispatch(setLoading(true))
    try {
      const data = await AuthAPI.read()

      if (data.id) {
        dispatch(updateUser(data))
        dispatch(setAuthentication(true))
        dispatch(setLoading(false))
      } else {
        dispatch(setAuthentication(false))
        dispatch(setLoading(false))
      }
    } catch (e) {
      console.log('error', e)
      dispatch(setAuthentication(false))
      dispatch(setLoading(false))
    }
  }
}
