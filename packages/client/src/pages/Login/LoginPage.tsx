import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react'
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
import { useAuth } from '../../shared/model/auth/useAuth'

export const LoginPage: FC = () => {
  const { login, isLoggedIn } = useAuth()

  const [isLogged, setIsLogged] = useState(isLoggedIn)

  useEffect(() => {
    console.log('user is logged in', isLogged)

    setIsLogged(true)
  }, [isLoggedIn])

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

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault()

    try {
      const response = await AuthAPI.signin(formData)

      console.log('response', response)

      if (response === 'OK') {
        login()
        console.log('log user in, change user isLoggedIn state to true')
      }
    } catch (error) {
      console.log(error)
    }

    console.log('is logged in?', isLogged)

    // setFormData({
    //   login: '',
    //   password: '',
    // })
  }

  const handleLogOut = async () => {
    AuthAPI.logout()
  }

  const handleGetUser = async () => {
    AuthAPI.read()
  }

  return (
    <LayoutCentered>
      <S.Content>
        <Title>
          Вход, {isLoggedIn ? 'user logged in' : 'user not logged in'}
        </Title>

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
            <Button
              content="Log Out"
              type="button"
              mode={ButtonMode.OUTLINE}
              onClick={handleLogOut}
            />
            <Button
              content="Get User"
              type="button"
              mode={ButtonMode.OUTLINE}
              onClick={handleGetUser}
            />
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
