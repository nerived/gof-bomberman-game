import { FC, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { RoutesPaths } from '../../routes/constants'
import { useAppDispatch } from '../../store'

import { userThunks, userSelectors, resetUser } from '../../features/user'

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

  const handleLogout = () => {
    userThunks.userLogout()
    dispatch(resetUser())
    navigate(RoutesPaths.Login)
  }

  const preparedField = useMemo(() => {
    return mapUserField(user)
  }, [user])

  return (
    <Layout title={'Профиль'}>
      <FormLayout>
        <S.Head>
          <Avatar name="Иван" isEditAlloved={true} />
        </S.Head>

        <S.Content>
          {preparedField.map(field => {
            return <RowField {...field} />
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
