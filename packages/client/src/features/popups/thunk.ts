import { createAsyncThunk } from '@reduxjs/toolkit'

import { RootState } from '../../store'

import { addPopup, deletePopup, Popup } from './reducer'
import { getPopupId } from './selectors'
import { promisify, resolve } from './services'

export const showPopupThunk = createAsyncThunk(
  'popup/show',
  async (data: Popup, { dispatch }) => {
    if (data.popupId) {
      dispatch(addPopup(data))
      return promisify(data.popupId)
    }
  }
)

export const hidePopupThunk = createAsyncThunk(
  'popup/hide',
  async (data: { result?: any }, { dispatch, getState }) => {
    const popupId = getPopupId(getState() as RootState)
    if (popupId) {
      dispatch(deletePopup())
      resolve(popupId, data.result)
    }
  }
)
