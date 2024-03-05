import { FC, useMemo } from 'react'
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
} from '../../ui-kit'
import { RoutesPaths } from '../../routes/constants'
import { userThunks, userSelectors } from '../../features/user'
import { UserData } from '../../api/UserAPI'

import * as S from './ProfileEdit.styled'
import { mapUserField } from './services'

export const ProfileEdit: FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

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
    const isSuccess = await dispatch(userThunks.changeUserThunk(data))

    if (isSuccess) {
      navigate(RoutesPaths.Profile)
    }
  }

  return (
    <Layout title={'Изменить данные'}>
      <FormLayout>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSave}
          enableReinitialize>
          {({ handleSubmit, dirty, isSubmitting, isValid }) => {
            return (
              <Form onSubmit={handleSubmit}>
                <S.Head>
                  <Avatar name={user?.first_name} avatarUrl={user?.avatar} />
                </S.Head>

                <S.Content>
                  {preparedField.map(field => {
                    return <RowField key={field.name} {...field} isEditable />
                  })}
                </S.Content>

                <S.Actions>
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
    </Layout>
  )
}
