import { FC, useMemo, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { Formik, Form, FastField } from 'formik'

import { useAppDispatch } from '../../store'

import {
  Layout,
  CustomField,
  Button,
  ButtonMode,
  LinkButton,
  LinkButtonMode,
  Loader,
} from '../../ui-kit'

import { RoutesPaths } from '../../routes/constants'
import { SigninData } from '../../api/AuthAPI'
import { userThunks } from '../../features/user'
import { useAuth } from '../../features/user/hooks/useAuth'

import { loginFields } from './constants'
import { OauthYaButton } from '../../components/OauthYaButton/OauthYaButton'
import * as S from './Login.styled'

export const LoginPage: FC = () => {
  const dispatch = useAppDispatch()
  const { isUserAuthenticated } = useAuth()
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const initialValues = useMemo(() => {
    return { login: '', password: '' }
  }, [])

  const handleLogin = async (data: SigninData) => {
    setIsLoading(true)

    const result = await dispatch(userThunks.userLogin(data))

    if (result.payload) {
      if (result.payload?.isSuccess) {
        await dispatch(userThunks.fetchUser())
      } else {
        if (result.payload?.reason) {
          setErrorMessage(result.payload?.reason)
        }
      }
    }
    setIsLoading(false)
  }

  return isUserAuthenticated ? (
    <Navigate to={RoutesPaths.Main} />
  ) : (
    <Layout title={'Вход'}>
      <S.Content>
        <Formik initialValues={initialValues} onSubmit={handleLogin}>
          {({ handleSubmit, dirty, isSubmitting, isValid }) => {
            return (
              <Form onSubmit={handleSubmit}>
                {loginFields.map(item => {
                  return (
                    <FastField
                      key={item.id}
                      {...item}
                      component={CustomField}
                    />
                  )
                })}
                {errorMessage && <S.Error>{errorMessage}</S.Error>}

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
        <OauthYaButton />
      </S.Content>
      {isLoading && <Loader />}
    </Layout>
  )
}
