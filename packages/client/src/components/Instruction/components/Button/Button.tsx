import { FC, PropsWithChildren } from 'react'

import * as S from './Button.styled'

type ButtonProps = PropsWithChildren & S.SButtonProps

export const Button: FC<ButtonProps> = ({ rotate, children, $isImg }) => {
  return (
    <S.Button rotate={rotate} $isImg={$isImg}>
      {children}
    </S.Button>
  )
}
