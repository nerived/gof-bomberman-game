import { styled } from 'styled-components'
import { Colors } from '../../tokens'

export const PlayerRowStyled = styled.div`
  display: flex;
  align-items: center;
  height: 56px;
  width: 500px;
  color: ${Colors.YELLOW};
  margin-bottom: 8px;
`

export const PlayerInfoStyled = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  gap: 8px;
  width: 100%;
`

export const AvatarWrapperStyled = styled.div`
  width: 48px;
  aspect-ratio: 1;
  border-radius: 50%;
  overflow: hidden;
`

export const LidersPageStyled = styled.h1`
  text-align: center;
  color: ${Colors.WHITE};
  margin-bottom: 16px;
`
