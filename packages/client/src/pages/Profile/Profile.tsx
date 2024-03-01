import { FC, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { RoutesPaths } from '../../routes/constants'
import type { RootState } from '../../store'

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
type UserFields = {
  label: string
  key: string
  value: string
}
const userFields = [
  {
    label: 'Почта',
    key: 'email',
    value: '',
  },
  {
    label: 'Логин',
    key: 'login',
    value: '',
  },
  {
    label: 'Имя',
    key: 'first_name',
    value: '',
  },
  {
    label: 'Фамилия',
    key: 'second_name',
    value: '',
  },
  {
    label: 'Отображаемое имя',
    key: 'display_name',
    value: '',
  },
  {
    label: 'Телефон',
    key: 'phone',
    value: '',
  },
]

const mapUserField = (user: RootState['user']) => {
  return userFields.reduce<UserFields[]>((acc, item) => {
    item.value =
      user[item.key as keyof Omit<RootState['user'], 'id'>] || 'not set'
    acc.push(item)
    return acc
  }, [] as UserFields[])
}

export const Profile: FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const user = useSelector(userSelectors.getUser)

  const handleLogout = () => {
    dispatch(userThunks.userLogout())
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
