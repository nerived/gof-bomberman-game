import * as S from './IconButton.styled'

interface IconButtonProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  iconImage: string
}

export function IconButton({ onClick, iconImage }: IconButtonProps) {
  return (
    <S.Container onClick={onClick}>
      <S.Icon $image={iconImage} />
    </S.Container>
  )
}
