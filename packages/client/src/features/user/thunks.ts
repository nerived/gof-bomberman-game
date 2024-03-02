import { createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

import AuthAPI, { SigninData, User, UserError } from '../../api/AuthAPI'
import { updateUser, resetUser, setLoading, setAuthentication } from './reducer'

export const userLogin = async (data: SigninData): Promise<boolean> => {
  try {
    await AuthAPI.signin(data)
    return true
  } catch (e) {
    console.log('error', e)
    return false
  }
}

export const userLogout = async () => {
  try {
    AuthAPI.logout()
  } catch (e) {
    console.log('userLogout error', e)
  }
}

export const fetchUserThunk = createAsyncThunk(
  'user/fetch',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const data = await AuthAPI.read()
      if (data.id) {
        dispatch(updateUser(data))
        return data
      } else {
        dispatch(setAuthentication(false))
        return rejectWithValue('No user data')
      }
    } catch (e) {
      console.log('error', e)
      dispatch(setAuthentication(false))
      return rejectWithValue(e)
    }
  }
)
