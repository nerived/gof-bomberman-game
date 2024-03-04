import { createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

import AuthAPI, { SigninData, SignupData, UserError } from '../../api/AuthAPI'
import UserAPI, { UserData, UserChangePassword } from '../../api/UserAPI'
import { updateUser, setAuthentication } from './reducer'

export const userSignUp = async (data: SignupData): Promise<boolean> => {
  try {
    await AuthAPI.signup(data)
    return true
  } catch (e) {
    console.log('error', e)
    return false
  }
}

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
    } catch (error: any) {
      if (!error?.response) {
        throw error
      }
      const err = error as AxiosError<UserError>
      dispatch(setAuthentication(false))

      return rejectWithValue(err?.response?.data)
    }
  }
)

export const changeUserThunk = createAsyncThunk(
  'user/change',
  async (data: UserData, { dispatch, rejectWithValue }) => {
    try {
      const result = await UserAPI.changeUser(data)
      if (result) {
        dispatch(updateUser(result))
        return result
      } else {
        return rejectWithValue('No user data')
      }
    } catch (error: any) {
      if (!error?.response) {
        throw error
      }
      const err = error as AxiosError<UserError>
      dispatch(setAuthentication(false))

      return rejectWithValue(err?.response?.data)
    }
  }
)

export const changePasswordThunk = createAsyncThunk(
  'user/changePassword',
  async (data: UserChangePassword, { dispatch, rejectWithValue }) => {
    try {
      const result = await UserAPI.changePassword(data)
      if (result) {
        return result
      } else {
        return rejectWithValue('No user data')
      }
    } catch (error: any) {
      if (!error?.response) {
        throw error
      }
      const err = error as AxiosError<UserError>
      dispatch(setAuthentication(false))

      return rejectWithValue(err?.response?.data)
    }
  }
)

export const changeAvatarThunk = createAsyncThunk(
  'user/changeAvatar',
  async (data: FormData, { dispatch, rejectWithValue }) => {
    try {
      const result = await UserAPI.changeAvatar(data)

      if (result) {
        dispatch(updateUser(result))
        return result
      } else {
        return rejectWithValue('No user data')
      }
    } catch (error: any) {
      if (!error?.response) {
        throw error
      }
      const err = error as AxiosError<UserError>
      dispatch(setAuthentication(false))

      return rejectWithValue(err?.response?.data)
    }
  }
)
