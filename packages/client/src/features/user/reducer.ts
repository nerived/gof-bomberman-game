import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import type { User } from '../../api/AuthAPI'
import { fetchUserThunk } from './thunks'

const initialState: User = {
  id: null,
  first_name: '',
  second_name: '',
  display_name: '',
  login: '',
  email: '',
  password: '',
  phone: '',
  avatar: '',
  isAuthenticated: null,
  isLoading: true,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<User>) => {
      Object.assign(state, action.payload)
      state.isAuthenticated = true
    },

    resetUser: state => {
      Object.assign(state, initialState, { isLoading: false })
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },

    setAuthentication: (state, action: PayloadAction<boolean | null>) => {
      state.isAuthenticated = action.payload
    },
  },

  extraReducers: builder => {
    builder
      .addCase(fetchUserThunk.pending, state => {
        state.isLoading = true
      })

      .addCase(fetchUserThunk.fulfilled, (state, action) => {
        Object.assign(state, action.payload)
        state.isAuthenticated = true
        state.isLoading = false
      })

      .addCase(fetchUserThunk.rejected, state => {
        state.isLoading = false
        state.isAuthenticated = false
      })
  },
})

export const { updateUser, resetUser, setLoading, setAuthentication } =
  userSlice.actions

export const userReducer = userSlice.reducer
