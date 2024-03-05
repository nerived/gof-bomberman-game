import { createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

import UserAPI, { UserChangePassword, CommonError } from '../../../api/UserAPI'

import { TechnicalError } from '../constants'
import { CommonResult } from '../types'

export const changePassword = createAsyncThunk<
  CommonResult,
  UserChangePassword,
  {
    rejectValue: CommonResult
    fulfillWithValue: CommonResult
  }
>(
  'user/changePassword',
  async (data, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await UserAPI.changePassword(data)
      console.log('response', response)
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
  }
)
