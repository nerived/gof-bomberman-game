import { FC } from 'react'

import * as S from './LoseLive.styled'
import { Button } from '../../../../ui-kit'

type LoseLiveProps = {
  onPlayGame: () => void
  onGoRoot: () => void
  params?: {
    conuntLive: number
  }
}

export const LoseLive: FC<LoseLiveProps> = ({
  onPlayGame,
  onGoRoot,
  params,
}) => {
  return (
    <>
      <S.Title>Потеряна жизнь</S.Title>
      <S.Descr>Осталось жизней: {params?.conuntLive}</S.Descr>
      <S.Descr>Можно продолжить игру и взорвать всех врагов</S.Descr>

      <S.Actions>
        <Button onClick={onGoRoot} content="Выйти" />
        <Button onClick={onPlayGame} content="Продолжить" />
      </S.Actions>
    </>
  )
}
