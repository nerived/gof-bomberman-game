import { PopupTypes } from './types'

const PROMISES = {} as Record<PopupTypes, any>
const RESOLVERS = {} as Record<PopupTypes, any>

export const promisify = <R = any>(popupId: PopupTypes): Promise<R> => {
  resolve(popupId, null)
  PROMISES[popupId] = new Promise(resolver => {
    RESOLVERS[popupId] = resolver
  })
  return PROMISES[popupId]
}

export const resolve = (popupId: PopupTypes, result: any) => {
  if (RESOLVERS[popupId]) {
    RESOLVERS[popupId](result)
    delete PROMISES[popupId]
    delete RESOLVERS[popupId]
  }
}
