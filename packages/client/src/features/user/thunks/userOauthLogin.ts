import { createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

import OAuthAPI, { CommonError, OAuthLoginData } from '../../../api/OAuthAPI'

export const userOauthLogin = createAsyncThunk<
  { isSuccess: true },
  OAuthLoginData,
  {
    rejectValue: { isSuccess: false; reason: string }
    fulfillWithValue: { isSuccess: true }
  }
>('user/oauthLogin', async (data, { fulfillWithValue, rejectWithValue }) => {
  try {
    const response = await OAuthAPI.login(data)

    if (response === 'OK') {
      return fulfillWithValue({
        isSuccess: true,
      })
    } else {
      throw response
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
