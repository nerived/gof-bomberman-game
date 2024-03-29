import { ChangeEvent, FC, useMemo, useState } from 'react'
import { Formik, Form, FastField } from 'formik'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch } from '../../store'

import {
  Layout,
  FormLayout,
  Button,
  ButtonMode,
  LinkButton,
  LinkButtonMode,
  FileField,
  Avatar,
  Loader,
} from '../../ui-kit'
import { RoutesPaths } from '../../routes/constants'
import { userThunks, userSelectors } from '../../features/user'

import * as S from './EditAvatar.styled'

type InitialValues = {
  avatar: FormData | null
}

export const EditAvatar: FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [preview, setPreview] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const [avatarFile, setAvatarFile] = useState<File>()
  const user = useSelector(userSelectors.getUser)

  const initialValues = useMemo(() => {
    return {
      avatar: null,
    } as InitialValues
  }, [])

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (file) {
      setAvatarFile(file)
      const fileReader = new FileReader()
      fileReader.onload = async (event: ProgressEvent<FileReader>) => {
        const target = event.target
        if (target) {
          const base64 = target.result
          if (base64) {
            setPreview(base64 as string)
          }
        }
      }
      fileReader.readAsDataURL(file)
    }
  }

  const handleSave = async () => {
    if (avatarFile) {
      setIsLoading(true)

      const formData = new FormData()
      formData.append('avatar', avatarFile as Blob)

      const result = await dispatch(userThunks.changeAvatar(formData))

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
    } else {
      setErrorMessage('Выберите файл')
    }
  }

  return (
    <Layout title={'Изменить аватар'}>
      <S.Root>
        <FormLayout>
          <Formik initialValues={initialValues} onSubmit={handleSave}>
            {({ handleSubmit }) => {
              return (
                <Form onSubmit={handleSubmit}>
                  <Avatar avatarUrl={user?.avatar} nextAvatar={preview} />

                  <S.Content>
                    <FastField
                      name={'avatar'}
                      type={'file'}
                      content={'Выберите файл'}
                      onChange={handleImageChange}
                      component={FileField}
                    />
                  </S.Content>

                  <S.Actions>
                    {errorMessage && <S.Error>{errorMessage}</S.Error>}
                    <S.Action>
                      <Button
                        type="submit"
                        content="Сохранить"
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
