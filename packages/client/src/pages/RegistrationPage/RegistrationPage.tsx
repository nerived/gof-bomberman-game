import { FC, useEffect, useMemo } from 'react'
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
} from '../../ui-kit'
import { RoutesPaths } from '../../routes/constants'
import { userThunks } from '../../features/user'
import { SignupData } from '../../api/AuthAPI'

import { userFieldsConfig } from './constants'
import * as S from './RegistrationPage.styled'
import { useAuth } from '../../features/user/hooks/useAuth'

export const RegistrationPage: FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

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
    const isSuccess = await userThunks.userSignUp(data)

    if (isSuccess) {
      await dispatch(userThunks.fetchUserThunk())
      navigate(RoutesPaths.Profile)
    }
  }

  return (
    <Layout title={'Регистрация'}>
      <FormLayout>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSave}
          enableReinitialize>
          {({ handleSubmit, dirty, isSubmitting, isValid, ...other }) => {
            console.log('other', other)
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
    </Layout>
  )
}
