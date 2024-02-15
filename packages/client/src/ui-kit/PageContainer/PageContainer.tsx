import { FC, PropsWithChildren } from 'react'

import * as S from './PageContainer.styled'

export const PageContainer: FC<PropsWithChildren> = ({ children }) => {
  return (
    <S.PageContainer>
      <S.Inner>{children}</S.Inner>
    </S.PageContainer>
  )
}
