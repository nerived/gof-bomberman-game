import { FC, useEffect, useMemo, useState } from 'react'
import { Formik, Form, FastField } from 'formik'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch } from '../../store'

import {
  Layout,
  FormLayout,
  Button,
  ButtonMode,
  LinkButton,
  LinkButtonMode,
  CustomField,
  Loader,
} from '../../ui-kit'

import { RoutesPaths } from '../../routes/constants'
import { useAuth } from '../../features/user/hooks/useAuth'
import { userThunks } from '../../features/user'
import { SignupData } from '../../api/AuthAPI'

import { userFieldsConfig } from './constants'
import * as S from './RegistrationPage.styled'

export const RegistrationPage: FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const { isUserAuthenticated } = useAuth()

  useEffect(() => {
    if (isUserAuthenticated) {
      navigate(RoutesPaths.Main)
    }
  }, [isUserAuthenticated, navigate])

  const initialValues = useMemo(() => {
    return {
      email: '',
      login: '',
      first_name: '',
      second_name: '',
      phone: '',
      password: '',
    }
  }, [])

  const handleSave = async (data: SignupData) => {
    setIsLoading(true)

    const result = await dispatch(userThunks.userSignUp(data))

    if (result.payload) {
      if (result.payload?.isSuccess) {
        await dispatch(userThunks.fetchUser())
        navigate(RoutesPaths.Profile)
      } else {
        if (result.payload?.reason) {
          setErrorMessage(result.payload?.reason)
        }
      }
    }
    setIsLoading(false)
  }

  return (
    <Layout title={'Регистрация'}>
      <FormLayout>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSave}
          enableReinitialize>
          {({ handleSubmit, dirty, isSubmitting, isValid, ...other }) => {
            return (
              <Form onSubmit={handleSubmit}>
                <S.Content>
                  {userFieldsConfig.map(item => {
                    return (
                      <FastField
                        key={item.name}
                        {...item}
                        component={CustomField}
                      />
                    )
                  })}
                </S.Content>

                <S.Actions>
                  {errorMessage && <S.Error>{errorMessage}</S.Error>}
                  <S.Action>
                    <Button
                      content="Регистрация"
                      mode={ButtonMode.MAIN}
                      disabled={!dirty || isSubmitting || !isValid}
                      type="submit"
                    />
                  </S.Action>
                  <S.Action>
                    <LinkButton
                      content="Отмена"
                      mode={LinkButtonMode.OUTLINE}
                      to={RoutesPaths.Main}
                    />
                  </S.Action>
                </S.Actions>
              </Form>
            )
          }}
        </Formik>
      </FormLayout>
      {isLoading && <Loader />}
    </Layout>
  )
}
