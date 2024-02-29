import { ChangeEvent, FC, FormEvent, useState } from 'react'
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
import { RoutesPaths } from '../../routes/constants'

import * as S from './Login.styled'
import AuthAPI from '../../api/AuthAPI'

export const LoginPage: FC = () => {
  const [formData, setFormData] = useState({
    login: '',
    password: '',
  })

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    setFormData(prevFormData => {
      return {
        ...prevFormData,
        [name]: value,
      }
    })
  }

  const handleLogin = (e: FormEvent) => {
    e.preventDefault()
    AuthAPI.signin(formData)

    setFormData({
      login: '',
      password: '',
    })
  }

  return (
    <LayoutCentered>
      <S.Content>
        <Title>Вход</Title>

        <Form onSubmit={handleLogin}>
          {config.map(item => {
            return (
              <Field
                key={item.id}
                placeholder={item.placeholder}
                name={item.name}
                type={item.type}
                onChange={handleChange}
                value={formData[item.name as keyof typeof formData]}
              />
            )
          })}

          <S.Actions>
            <S.Action>
              <Button content="Вход" type="submit" mode={ButtonMode.MAIN} />
            </S.Action>
            <S.Action>
              <LinkButton
                content="Регистрация"
                to={RoutesPaths.Registration}
                mode={LinkButtonMode.OUTLINE}
              />
            </S.Action>
          </S.Actions>
        </Form>
      </S.Content>
    </LayoutCentered>
  )
}
