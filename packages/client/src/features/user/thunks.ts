import { createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

import AuthAPI, { SigninData, User, UserError } from '../../api/AuthAPI'

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

export const fetchUserThunk = createAsyncThunk<
  User,
  void,
  {
    rejectValue: UserError
  }
>('user/update', async (_: void, { rejectWithValue }) => {
  try {
    const response = await AuthAPI.read()
    return response
  } catch (err) {
    const error: AxiosError<UserError> = err as any
    if (!error.response) {
      throw err
    }
    return rejectWithValue(error.response.data)
  }
})
