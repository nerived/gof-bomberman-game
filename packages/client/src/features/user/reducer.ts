import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import type { User } from '../../api/AuthAPI'
import { fetchUserThunk } from './thunks'

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
      return action.payload
    },
    resetUser: state => {
      return initialState
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchUserThunk.fulfilled, (state, action) => {
      return action.payload
    })
  },
})

export const { updateUser, resetUser } = userSlice.actions

export const userReducer = userSlice.reducer
