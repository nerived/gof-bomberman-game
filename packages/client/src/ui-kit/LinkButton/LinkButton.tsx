import { FC } from 'react'

import * as S from './LinkButton.styled'

export const LinkButton: FC<S.LinkButtonProps> = ({
  content,
  ...otherProps
}) => {
  return <S.LinkButton {...otherProps}>{content}</S.LinkButton>
}
