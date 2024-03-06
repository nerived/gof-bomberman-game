import { createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

import UserAPI, { CommonError } from '../../../api/UserAPI'

import { TechnicalError } from '../constants'
import { CommonResult } from '../types'
import { updateUser } from '../reducer'

export const changeAvatar = createAsyncThunk<
  CommonResult,
  FormData,
  {
    rejectValue: CommonResult
    fulfillWithValue: CommonResult
  }
>(
  'user/changeAvatar',
  async (data, { dispatch, fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await UserAPI.changeAvatar(data)
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
