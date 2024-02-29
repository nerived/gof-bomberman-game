import type { Middleware } from 'redux'

const createCustomThunkMiddleware = () => {
  const middleware: Middleware<any, any> =
    ({ dispatch, getState }) =>
    next =>
    action => {
      if (typeof action === 'function') {
        return action(dispatch, getState)
      }
      return next(action)
    }
  return middleware
}

export const customThunk = createCustomThunkMiddleware()
