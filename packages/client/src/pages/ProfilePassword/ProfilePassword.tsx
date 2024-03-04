import { FC, useMemo } from 'react'
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
} from '../../ui-kit'
import { RoutesPaths } from '../../routes/constants'
import { userThunks } from '../../features/user'

import { userFieldsConfig } from './constants'
import * as S from './ProfilePassword.styled'

export const ProfilePassword: FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const initialValues = useMemo(() => {
    return {
      oldPassword: '',
      newPassword: '',
      newPasswordRepeat: '',
    }
  }, [])

  const handleSave = async ({
    newPasswordRepeat,
    ...payload
  }: UserChangePassword & { newPasswordRepeat: string }) => {
    const isSuccess = await dispatch(userThunks.changePasswordThunk(payload))

    if (isSuccess) {
      navigate(RoutesPaths.Profile)
    }
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
                      return <RowField isEditable key={field.name} {...field} />
                    })}
                  </S.Content>

                  <S.Actions>
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
    </Layout>
  )
}
