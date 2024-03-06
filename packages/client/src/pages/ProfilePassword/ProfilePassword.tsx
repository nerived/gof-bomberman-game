import { FC, useMemo, useState } from 'react'
import { Formik, Form } from 'formik'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch } from '../../store'
import { UserChangePassword } from '../../api/UserAPI'

import {
  Layout,
  FormLayout,
  RowField,
  Button,
  ButtonMode,
  LinkButton,
  LinkButtonMode,
  Loader,
} from '../../ui-kit'
import { RoutesPaths } from '../../routes/constants'
import { userThunks } from '../../features/user'

import { userFieldsConfig } from './constants'
import * as S from './ProfilePassword.styled'

export const ProfilePassword: FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const initialValues = useMemo(() => {
    return {
      oldPassword: '',
      newPassword: '',
    }
  }, [])

  const handleSave = async (data: UserChangePassword) => {
    setIsLoading(true)

    const result = await dispatch(userThunks.changePassword(data))

    if (result.payload) {
      if (result.payload?.isSuccess) {
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
    <Layout title={'Изменить пароль'}>
      <S.Root>
        <FormLayout>
          <Formik initialValues={initialValues} onSubmit={handleSave}>
            {({ handleSubmit, dirty, isSubmitting, isValid }) => {
              return (
                <Form onSubmit={handleSubmit}>
                  <S.Content>
                    {userFieldsConfig.map(field => {
                      return <RowField key={field.name} isEditable {...field} />
                    })}
                  </S.Content>

                  <S.Actions>
                    {errorMessage && <S.Error>{errorMessage}</S.Error>}
                    <S.Action>
                      <Button
                        type="submit"
                        content="Сохранить"
                        disabled={!dirty || isSubmitting || !isValid}
                        mode={ButtonMode.MAIN}
                      />
                    </S.Action>
                    <S.Action>
                      <LinkButton
                        content="Отмена"
                        mode={LinkButtonMode.OUTLINE}
                        to={RoutesPaths.Profile}
                      />
                    </S.Action>
                  </S.Actions>
                </Form>
              )
            }}
          </Formik>
        </FormLayout>
      </S.Root>
      {isLoading && <Loader />}
    </Layout>
  )
}
