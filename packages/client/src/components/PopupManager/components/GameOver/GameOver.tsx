import { FC } from 'react'

import { Button } from '../../../../ui-kit'

import * as S from './GameOver.styled'

type GameOverProps = {
  onPlayGame: () => void
  onGoRoot: () => void
  params?: {
    totalScore: number
  }
}

export const GameOver: FC<GameOverProps> = ({
  onPlayGame,
  onGoRoot,
  params,
}) => {
  return (
    <>
      <S.Title>Игра проиграна</S.Title>
      <S.Descr>Вы потратили все жизни. </S.Descr>
      <S.Descr>Набрано очков: {params?.totalScore || 0}</S.Descr>

      <S.Actions>
        <Button onClick={onGoRoot} content="Выйти" />
        <Button onClick={onPlayGame} content="Начать сначала" />
      </S.Actions>
    </>
  )
}
