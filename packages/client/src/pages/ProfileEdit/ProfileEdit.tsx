import { FC, useMemo, useState } from 'react'
import { Formik, Form } from 'formik'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch } from '../../store'

import {
  Layout,
  FormLayout,
  Avatar,
  RowField,
  Button,
  ButtonMode,
  LinkButton,
  LinkButtonMode,
  Loader,
} from '../../ui-kit'
import { RoutesPaths } from '../../routes/constants'
import { userThunks, userSelectors } from '../../features/user'
import { UserData } from '../../api/UserAPI'

import * as S from './ProfileEdit.styled'
import { mapUserField } from './services'

export const ProfileEdit: FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const user = useSelector(userSelectors.getUser)

  const { preparedField, initialValues } = useMemo(() => {
    const preparedField = mapUserField(user)
    const initialValues = preparedField.reduce((acc, item) => {
      acc[item.name as keyof UserData] = item.value
      return acc
    }, {} as UserData)
    return { preparedField, initialValues }
  }, [user])

  const handleSave = async (data: UserData) => {
    setIsLoading(true)
    const result = await dispatch(userThunks.changeUser(data))
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
    <Layout title={'Изменить данные'}>
      <FormLayout>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSave}
          enableReinitialize>
          {({ handleSubmit, dirty, isSubmitting, isValid, errors }) => {
            return (
              <Form onSubmit={handleSubmit}>
                <S.Head>
                  <Avatar
                    name={user?.first_name}
                    avatarUrl={user?.avatar}
                    isEditAlloved
                  />
                </S.Head>

                <S.Content>
                  {preparedField.map(field => {
                    return (
                      <RowField
                        key={field.name}
                        {...field}
                        isEditable
                        error={!!errors?.[field.name as keyof UserData]}
                      />
                    )
                  })}
                </S.Content>

                <S.Actions>
                  {errorMessage && <S.Error>{errorMessage}</S.Error>}
                  <S.Action>
                    <Button
                      content="Сохранить"
                      mode={ButtonMode.MAIN}
                      disabled={!dirty || isSubmitting || !isValid}
                      type="submit"
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
      {isLoading && <Loader />}
    </Layout>
  )
}
