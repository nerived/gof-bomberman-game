import { createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

import OAuthAPI, { CommonError } from '../../../api/OAuthAPI'

import { TechnicalError } from '../constants'

export const fetchOauthId = createAsyncThunk<
  { isSuccess: true; serviceId: string },
  string,
  {
    rejectValue: { isSuccess: false; reason: string }
    fulfillWithValue: { isSuccess: true; serviceId: string }
  }
>(
  'user/oauthId',
  async (redirectURI, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await OAuthAPI.getServiceId(redirectURI)

      if (response.service_id) {
        return fulfillWithValue({
          isSuccess: true,
          serviceId: response.service_id,
        })
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
