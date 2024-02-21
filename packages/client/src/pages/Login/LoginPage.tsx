import { FC, FormEvent } from 'react'
import {
  Title,
  LayoutCentered,
  Field,
  Form,
  Button,
  ButtonMode,
  LinkButton,
  LinkButtonMode,
} from '../../ui-kit'
import { config } from './Config'
import * as S from './Login.styled'

export const LoginPage: FC = () => {
  const handleLogin = (e: FormEvent) => {
    e.preventDefault()
    console.log('handleLogin')
  }

  return (
    <LayoutCentered>
      <S.Content>
        <Title>Вход</Title>
        <Form onSubmit={handleLogin}>
          {config.map(item => {
            return <Field key={item.id} placeholder={item.placeholder} />
          })}

          <S.Actions>
            <S.Action>
              <Button content="Вход" type="submit" mode={ButtonMode.MAIN} />
            </S.Action>
            <S.Action>
              <LinkButton
                content="Регистрация"
                href="/registration"
                mode={LinkButtonMode.OUTLINE}
              />
            </S.Action>
          </S.Actions>
        </Form>
      </S.Content>
    </LayoutCentered>
  )
}
