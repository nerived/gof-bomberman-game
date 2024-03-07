import { FC, useMemo } from 'react'
import { useSelector } from 'react-redux'

import * as S from './PopupManager.styled'

import { useAppDispatch } from '../../store'
import { popupsSelectors, PopupTypes, popupsThunk } from '../../features/popups'
import { Colors } from '../../tokens'

import { PlayPopup } from './components/PlayPopup'
import { LoseLive } from './components/LoseLive'
import { GameOver } from './components/GameOver'

export const PopupManager = () => {
  const dispatch = useAppDispatch()
  const { popupId, params } = useSelector(popupsSelectors.getPopup)

  const onClosePopup = () => {
    dispatch(popupsThunk.hidePopupThunk({ result: 'closeBtn' }))
  }

  const onCliclOverlay = () => {
    dispatch(popupsThunk.hidePopupThunk({ result: 'overlay' }))
  }

  const onPlayGame = () => {
    dispatch(popupsThunk.hidePopupThunk({ result: 'play' }))
  }

  const onGoRoot = () => {
    dispatch(popupsThunk.hidePopupThunk({ result: 'root' }))
  }

  const popupContent = useMemo(() => {
    switch (popupId) {
      case PopupTypes.PLAY_GAME:
        return <PlayPopup onPlayGame={onPlayGame} onGoRoot={onGoRoot} />
      case PopupTypes.LOSE_LIVE:
        return (
          <LoseLive
            onPlayGame={onPlayGame}
            onGoRoot={onGoRoot}
            params={params}
          />
        )
      case PopupTypes.GAME_OVER:
        return (
          <GameOver
            onPlayGame={onPlayGame}
            onGoRoot={onGoRoot}
            params={params}
          />
        )
      default:
        return null
    }
  }, [popupId])

  if (!popupId) {
    return null
  }

  return (
    <S.Popup>
      <S.Overlay onClick={onCliclOverlay} />
      <S.Content>
        <S.Close onClick={onClosePopup}>
          <svg
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="m16 16-4-4m0 0L8 8m4 4 4-4m-4 4-4 4"
              stroke={Colors.YELLOW}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </S.Close>
        {popupContent}
      </S.Content>
    </S.Popup>
  )
}
