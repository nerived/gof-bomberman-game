import { FC, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
import { toOAuthPage, userThunks } from '../../features/user'
import { useAuth } from '../../features/user/hooks/useAuth'

import { loginFields } from './constants'
import * as S from './Login.styled'

export const LoginPage: FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { isUserAuthenticated } = useAuth()
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const initialValues = useMemo(() => {
    return { login: '', password: '' }
  }, [])

  useEffect(() => {
    if (isUserAuthenticated) {
      navigate(RoutesPaths.Main)
    }
  }, [isUserAuthenticated, navigate])

  useEffect(() => {
    let canceled = false

    const { search, href, origin, pathname } = globalThis.location

    if (!search) return

    const url = new URL(href)
    const code = url.searchParams.get('code')

    if (!code) return

    dispatch(
      userThunks.userOauthLogin({ code, redirect_uri: origin + pathname })
    ).then(data => {
      if (!data.payload?.isSuccess || canceled) return
      return dispatch(userThunks.fetchUser())
    })

    return () => {
      canceled = true
    }
  })

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

  const handleOAuthLogin = async () => {
    const { origin, pathname } = globalThis.location
    const redirectURI = origin + pathname

    try {
      setIsLoading(true)

      const { payload } = await dispatch(userThunks.fetchOauthId(redirectURI))

      if (!payload) return

      if (payload.isSuccess) {
        toOAuthPage(payload.serviceId, redirectURI)
      } else {
        if (payload.reason) {
          setErrorMessage(payload.reason)
        }
      }
    } catch (err) {
      //navigate to 500 page
    } finally {
      setIsLoading(false)
    }
  }

  return (
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
        <button style={{ color: 'white' }} onClick={handleOAuthLogin}>
          Войти c Яндекс ID
        </button>
      </S.Content>
      {isLoading && <Loader />}
    </Layout>
  )
}
