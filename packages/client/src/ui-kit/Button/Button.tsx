import { FC } from 'react'

import * as S from './Button.styled'
import { ButtonProps } from './Types'

export const Button: FC<ButtonProps> = ({ title, onClick, href, type }) => {
  return (
    <S.Button type={type} href={href} onClick={() => onClick}>
      {title}
    </S.Button>
  )
}
