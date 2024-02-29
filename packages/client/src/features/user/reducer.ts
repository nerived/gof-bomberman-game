import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import type { User } from '../../api/AuthAPI'

const initialState: User = {
  id: 0,
  first_name: '',
  second_name: '',
  display_name: '',
  login: '',
  email: '',
  password: '',
  phone: '',
  avatar: '',
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<User>) => {
      return { ...state, ...action.payload }
    },
    resetUser: () => {
      return { ...initialState }
    },
  },
})

export const { updateUser, resetUser } = userSlice.actions

export const userReducer = userSlice.reducer
