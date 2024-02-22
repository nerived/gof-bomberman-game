import { FC, PropsWithChildren } from 'react'

import * as S from './Layout.styled'

export const Layout: FC<{ title?: string } & PropsWithChildren> = ({
  children,
  title,
}) => {
  return (
    <S.Container>
      <S.Inner>
        {title && <S.Title>{title}</S.Title>}
        {children}
      </S.Inner>
    </S.Container>
  )
}
