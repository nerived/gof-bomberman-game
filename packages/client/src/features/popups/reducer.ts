import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { PopupTypes } from './types'

export type Popup = {
  popupId: PopupTypes | null
  params?: any
}

const initialState: Popup = {
  popupId: null,
}

export const popupsSlice = createSlice({
  name: 'popup',
  initialState,
  reducers: {
    addPopup: (state, action: PayloadAction<Popup>) => {
      Object.assign(state, action.payload)
    },

    deletePopup: state => {
      Object.assign(state, initialState)
    },
  },
})

export const { addPopup, deletePopup } = popupsSlice.actions

export const popupsReducer = popupsSlice.reducer
