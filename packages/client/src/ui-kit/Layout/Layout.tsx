import { FC, PropsWithChildren } from 'react'

import { Nav } from '../Nav'

import * as S from './Layout.styled'

export const Layout: FC<{ title?: string } & PropsWithChildren> = ({
  children,
  title,
}) => {
  return (
    <S.Container>
      <Nav />
      <S.Inner>
        {title && <S.Title>{title}</S.Title>}
        {children}
      </S.Inner>
    </S.Container>
  )
}
