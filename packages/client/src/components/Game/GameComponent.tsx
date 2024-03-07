import { FC, useLayoutEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch } from '../../store'
import { RoutesPaths } from '../../routes/constants'
import { PopupTypes, popupsThunk } from '../../features/popups'

import { Bomberman } from './bomberman'
import { Canvas, Wrapper } from './GameComponent.styled'

export const GameComponent: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const onStartGame = async () => {
    const result = await dispatch(
      popupsThunk.showPopupThunk({ popupId: PopupTypes.PLAY_GAME })
    )

    if (result.payload === 'root') {
      navigate(RoutesPaths.Main)
    }
  }

  const onLiveLose = async (conuntLive = 0) => {
    const result = await dispatch(
      popupsThunk.showPopupThunk({
        popupId: PopupTypes.LOSE_LIVE,
        params: { conuntLive: conuntLive + 1 },
      })
    )
    if (result.payload === 'root') {
      navigate(RoutesPaths.Main)
      return false
    }
    return true
  }

  const onWinLevel = (nextLevel?: number) => {
    console.log('onWinLevel')
  }

  const onGameOver = async (_totalScore: number) => {
    const result = await dispatch(
      popupsThunk.showPopupThunk({
        popupId: PopupTypes.GAME_OVER,
        params: { totalScore: _totalScore },
      })
    )
    if (result.payload === 'play') {
      return true
    }

    if (result.payload === 'root') {
      navigate(RoutesPaths.Main)
    } else {
      navigate(RoutesPaths.GameOver)
    }

    return false
  }

  useLayoutEffect(() => {
    if (!canvasRef.current) return

    const game = new Bomberman(canvasRef.current)

    game.willRestartHook = game => {
      //TODO
      //@ts-ignore
      const conuntLive = game?.mechanics?._lifes
      onLiveLose(conuntLive).then((isContinue: boolean) => {
        if (isContinue) {
          game.play()
        }
      })
    }

    game.didGameOverHook = _totalScore => {
      onGameOver(_totalScore).then((isNeedRestart = false) => {
        if (isNeedRestart) {
          game.play()
        }
      })
    }

    onStartGame()
    game.play()

    return () => {
      game.stop()
    }
  }, [])

  return (
    <Wrapper>
      <Canvas ref={canvasRef} />
    </Wrapper>
  )
}
