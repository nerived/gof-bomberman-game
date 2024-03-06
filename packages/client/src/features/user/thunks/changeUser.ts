import { createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

import UserAPI, { UserData, CommonError } from '../../../api/UserAPI'
import { updateUser } from '../reducer'

import { TechnicalError } from '../constants'
import { CommonResult } from '../types'

export const changeUser = createAsyncThunk<
  CommonResult,
  UserData,
  {
    rejectValue: CommonResult
    fulfillWithValue: CommonResult
  }
>(
  'user/change',
  async (data, { dispatch, fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await UserAPI.changeUser(data)
      console.log('response', response)
      if (response.id) {
        dispatch(updateUser(response))
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
