import { configureStore } from '@reduxjs/toolkit'

import { userReducer } from '../features/user'
import { customThunk } from '../helpers'

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
  //@ts-ignore
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(customThunk),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
