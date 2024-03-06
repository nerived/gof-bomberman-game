import { createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

import AuthAPI, { SignupData, CommonError } from '../../../api/AuthAPI'

import { TechnicalError } from '../constants'
import { CommonResult } from '../types'

export const userSignUp = createAsyncThunk<
  CommonResult,
  SignupData,
  {
    rejectValue: CommonResult
    fulfillWithValue: CommonResult
  }
>('user/join', async (data, { fulfillWithValue, rejectWithValue }) => {
  try {
    const response = await AuthAPI.signup(data)
    if (response.id) {
      return fulfillWithValue({ isSuccess: true })
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
