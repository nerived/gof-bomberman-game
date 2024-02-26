import { FC, PropsWithChildren } from 'react'

import * as S from './FormLayout.styled'

export const FormLayout: FC<PropsWithChildren> = props => {
  const { children } = props

  return <S.FormLayout>{children}</S.FormLayout>
}
