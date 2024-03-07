import { FC } from 'react'

import { Instruction } from '../../../Instruction'
import { Button } from '../../../../ui-kit'
import * as S from './PlayPopup.styled'

type PlayPopupProps = {
  onPlayGame: () => void
  onGoRoot: () => void
}

export const PlayPopup: FC<PlayPopupProps> = ({ onPlayGame, onGoRoot }) => {
  return (
    <>
      <Instruction />
      <S.Actions>
        <Button onClick={onGoRoot} content="Выйти" />
        <Button onClick={onPlayGame} content="Играть" />
      </S.Actions>
    </>
  )
}
