import { FC } from 'react'

import * as S from './RowLabel.styled'

export type RowLabelProps = {
  label: string
}

export const RowLabel: FC<RowLabelProps> = props => {
  const { label } = props

  return <S.RowLabel>{label}</S.RowLabel>
}
