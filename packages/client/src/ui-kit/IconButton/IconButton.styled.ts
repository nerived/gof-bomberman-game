import styled from 'styled-components'

interface IconProps {
  $image: string
}

interface ContainerProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export const Icon = styled.button<IconProps>`
  display: block;
  margin: 0;
  padding: 0;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  overflow: hidden;
  background-image: ${props => props.$image};

  transition: all 0.4s ease-in-out;

  &:focus {
    outline: none;
  }

  &:hover {
    opacity: 0.85;
  }

  &:active {
    opacity: 1;
  }
`
export const Container = styled.div<ContainerProps>`
  display: flex;
  justify-content: center;
  padding: 12px;
`
