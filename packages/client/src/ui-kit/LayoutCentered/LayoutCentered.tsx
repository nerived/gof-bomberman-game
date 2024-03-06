import { FC, PropsWithChildren } from 'react'

import { Nav } from '../Nav'

import * as S from './LayoutCentered.styled'

export const LayoutCentered: FC<PropsWithChildren> = ({ children }) => {
  return (
    <S.LayoutCentered>
      <Nav />
      <S.Inner>{children}</S.Inner>
    </S.LayoutCentered>
  )
}
