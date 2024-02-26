import { FC, PropsWithChildren } from 'react'

import * as S from './LayoutCentered.styled'

export const LayoutCentered: FC<PropsWithChildren> = ({ children }) => {
  return (
    <S.LayoutCentered>
      <S.Inner>{children}</S.Inner>
    </S.LayoutCentered>
  )
}
