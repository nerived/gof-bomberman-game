import { FC, useState, FormEvent, ChangeEvent, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

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
import { SigninData } from '../../api/AuthAPI'

import { userThunks } from '../../features/user'
import { userSelectors } from '../../features/user'
import { useSelector } from 'react-redux'

import * as S from './Login.styled'

//test user
// {
//   email: 'ivanivanov123232@yandex.ru'
//   first_name: 'Ivan'
//   login: 'ivanivanov123232'
//   password: 'Qwerty12345'
//   password_new: 'Qwerty54321'
//   phone: '79099673030'
//   second_name: 'Ivanov'
// }

export const LoginPage: FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(userSelectors.getUser)

  const [formValue, setFormValue] = useState<SigninData>({
    login: '',
    password: '',
  })

  useEffect(() => {
    if (user.isAuthenticated) {
      navigate(RoutesPaths.Main)
    }
  }, [user.isAuthenticated, navigate])

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await dispatch(userThunks.userLogin(formValue))

    setFormValue({
      login: '',
      password: '',
    })
  }

  const handleOnChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    const input: (EventTarget & HTMLInputElement) | null = e.target

    if (input && input.name) {
      const name = input.name
      const value = input.value
      setFormValue({ ...formValue, [name]: value })
    }
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
                value={formValue[item.name as keyof SigninData]}
                required={item.required}
                onChange={handleOnChangeValue}
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
