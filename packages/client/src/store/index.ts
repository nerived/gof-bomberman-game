import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

import { userReducer } from '../features/user'
import { forumReducer } from '../features/forum'

export const store = configureStore({
  reducer: {
    user: userReducer,
    forum: forumReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<typeof store.dispatch>()
