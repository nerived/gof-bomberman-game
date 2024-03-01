import { FC } from 'react'
import styled from 'styled-components'
import { RoutesPaths } from './../../../routes/constants'
import { Layout, LinkButton, LinkButtonMode } from '../../../ui-kit'
import { PixelText } from '../../../ui-kit/helpers/BaseStyles.styled'
import { Colors } from '../../../tokens'

const ContainerFlex = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 300px;
  gap: 64px;
`

const ErrorText = styled.h1`
  ${PixelText}
  color: ${Colors.YELLOW};
`

interface Props {
  errorText: string
}

export const ErrorPageContent: FC<Props> = props => {
  const { errorText } = props
  return (
    <Layout>
      <ContainerFlex>
        <ErrorText>{errorText}</ErrorText>
        <LinkButton
          mode={LinkButtonMode.BIT}
          to={RoutesPaths.Main}
          content="GO TO THE MAIN MENU"
        />
      </ContainerFlex>
    </Layout>
  )
}
