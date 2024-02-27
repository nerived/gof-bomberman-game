import { FC, PropsWithChildren } from 'react'

import { TempNav } from '../TempNav'

import * as S from './LayoutCentered.styled'

export const LayoutCentered: FC<PropsWithChildren> = ({ children }) => {
  return (
    <S.LayoutCentered>
      <TempNav />
      <S.Inner>{children}</S.Inner>
    </S.LayoutCentered>
  )
}
