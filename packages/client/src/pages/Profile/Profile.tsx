import { FC, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { RoutesPaths } from '../../routes/constants'
import { useAppDispatch } from '../../store'

import { userThunks, userSelectors } from '../../features/user'

import {
  Layout,
  FormLayout,
  Button,
  ButtonMode,
  LinkButton,
  LinkButtonMode,
  RowField,
  Avatar,
} from '../../ui-kit'

import * as S from './Profile.styled'

import { mapUserField } from './services'

export const Profile: FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const user = useSelector(userSelectors.getUser)

  const handleLogout = async () => {
    const result = await dispatch(userThunks.userLogout())
    if (result.payload?.isSuccess) {
      navigate(RoutesPaths.Login)
    }
  }

  const preparedField = useMemo(() => {
    return mapUserField(user)
  }, [user])

  return (
    <Layout title={'Профиль'}>
      <FormLayout>
        <S.Head>
          <Avatar
            name={user?.first_name}
            avatarUrl={user?.avatar}
            isEditAlloved
          />
        </S.Head>

        <S.Content>
          {preparedField.map(field => {
            return <RowField key={field.name} {...field} />
          })}
        </S.Content>

        <S.Actions>
          <S.Action>
            <LinkButton
              mode={LinkButtonMode.MAIN}
              to={RoutesPaths.EditProfile}
              content="Изменить данные"
            />
          </S.Action>
          <S.Action>
            <LinkButton
              mode={LinkButtonMode.MAIN}
              to={RoutesPaths.EditPassword}
              content="Изменить пароль"
            />
          </S.Action>
          <S.Action>
            <Button
              content="Выйти"
              mode={ButtonMode.OUTLINE}
              onClick={handleLogout}
            />
          </S.Action>
        </S.Actions>
      </FormLayout>
    </Layout>
  )
}
