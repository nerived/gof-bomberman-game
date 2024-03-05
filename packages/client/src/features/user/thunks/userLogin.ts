import { createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

import AuthAPI, { SigninData, CommonError } from '../../../api/AuthAPI'

import { TechnicalError } from '../constants'
import { CommonResult } from '../types'

export const userLogin = createAsyncThunk<
  CommonResult,
  SigninData,
  {
    rejectValue: CommonResult
    fulfillWithValue: CommonResult
  }
>('user/login', async (data, { fulfillWithValue, rejectWithValue }) => {
  try {
    const response = await AuthAPI.signin(data)
    if (response === 'OK') {
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
