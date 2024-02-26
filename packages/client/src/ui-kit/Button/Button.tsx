import { FC } from 'react'

import * as S from './Button.styled'

export const Button: FC<S.SButtonProps> = ({
  content,
  onClick,
  ...otherProps
}) => {
  return (
    <S.Button onClick={onClick} {...otherProps}>
      {content}
    </S.Button>
  )
}
