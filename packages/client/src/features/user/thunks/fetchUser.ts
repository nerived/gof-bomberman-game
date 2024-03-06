import { createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

import AuthAPI, { User, CommonError } from '../../../api/AuthAPI'
import { updateUser } from '../reducer'

import { TechnicalError } from '../constants'
import { CommonResult } from '../types'

export const fetchUser = createAsyncThunk<
  User,
  undefined,
  {
    fulfillWithValue: User
    rejectValue: CommonResult
  }
>('user/fetch', async (_, { dispatch, fulfillWithValue, rejectWithValue }) => {
  try {
    const response = await AuthAPI.read()
    if (response.id) {
      dispatch(updateUser(response))
      return fulfillWithValue(response)
    } else {
      return rejectWithValue(TechnicalError)
    }
  } catch (err) {
    const error = err as AxiosError<CommonError>
    if (!error.response) {
      throw err
    }
    return rejectWithValue({
      isSuccess: false,
      reason: error.response?.data?.reason,
    })
  }
})
