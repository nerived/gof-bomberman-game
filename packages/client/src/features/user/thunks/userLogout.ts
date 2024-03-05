import { createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

import AuthAPI, { CommonError } from '../../../api/AuthAPI'
import { resetUser } from '../reducer'

import { TechnicalError } from '../constants'
import { CommonResult } from '../types'

export const userLogout = createAsyncThunk<
  CommonResult,
  undefined,
  {
    rejectValue: CommonResult
    fulfillWithValue: CommonResult
  }
>('user/logout', async (_, { dispatch, fulfillWithValue, rejectWithValue }) => {
  try {
    const response = await AuthAPI.logout()
    if (response === 'OK') {
      dispatch(resetUser())
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
