import { FC, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Formik, Form, FastField } from 'formik'

import { useAppDispatch } from '../../store'

import {
  Title,
  LayoutCentered,
  CustomField,
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

export const LoginPage: FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const user = useSelector(userSelectors.getUser)

  const initialValues = useMemo(() => {
    return { login: '', password: '' }
  }, [])

  useEffect(() => {
    if (user.isAuthenticated) {
      navigate(RoutesPaths.Main)
    }
  }, [user.isAuthenticated, navigate])

  const handleLogin = async (data: SigninData) => {
    const isSuccess = await userThunks.userLogin(data)
    if (isSuccess) {
      dispatch(userThunks.fetchUserThunk())
    }
  }

  return (
    <LayoutCentered>
      <S.Content>
        <Title>Вход</Title>
        <Formik initialValues={initialValues} onSubmit={handleLogin}>
          {({ handleSubmit, dirty, isSubmitting, isValid }) => {
            return (
              <Form onSubmit={handleSubmit}>
                {config.map(item => {
                  return (
                    <FastField
                      key={item.id}
                      {...item}
                      component={CustomField}
                    />
                  )
                })}

                <S.Actions>
                  <S.Action>
                    <Button
                      content="Вход"
                      type="submit"
                      mode={ButtonMode.MAIN}
                      disabled={!dirty || isSubmitting || !isValid}
                    />
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
            )
          }}
        </Formik>
      </S.Content>
    </LayoutCentered>
  )
}
