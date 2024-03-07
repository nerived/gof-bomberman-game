import { RootState } from '../../store'

export const getPopup = (state: RootState) => {
  return state.popups
}

export const getPopupId = (state: RootState) => {
  return getPopup(state).popupId
}

export const getPopupParams = (state: RootState) => {
  return getPopup(state).params
}
