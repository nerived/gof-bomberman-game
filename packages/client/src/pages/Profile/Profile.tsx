import { FC, useEffect } from 'react'
import { RoutesPaths } from '../../routes/constants'

import AuthAPI from '../../api/AuthAPI'

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
import ErrorBoundary from '../../shared/ErrorBoundary'

const userFields = [
  {
    label: 'Почта',
    value: 'dawljn@dawda.daw',
  },
  {
    label: 'Логин',
    value: 'dAwdAWdawd',
  },
  {
    label: 'Имя',
    value: 'dawdadwa',
  },
  {
    label: 'Фамилия',
    value: 'dkajwdnaw',
  },
  {
    label: 'Отображаемое имя',
    value: 'Вшфоцвдол',
  },
  {
    label: 'Телефон',
    value: '1849142',
  },
]

export const Profile: FC = () => {
  const handleLogput = () => {
    console.log('handleLogput')
  }

  useEffect(() => {
    AuthAPI.read()
      .then(data => {
        console.log('data', data)
      })
      .catch(error => {
        console.log('error', error)
        console.dir(error)
      })
  }, [])

  return (
    <Layout title={'Профиль'}>
      <ErrorBoundary>
        <FormLayout>
          <S.Head>
            <ErrorBoundary>
              <Avatar name="Иван" isEditAlloved={true} />
            </ErrorBoundary>
          </S.Head>

          <S.Content>
            {userFields.map(field => {
              return <RowField {...field} />
            })}
          </S.Content>

          <S.Actions>
            <S.Action>
              <LinkButton
                mode={LinkButtonMode.MAIN}
                href={RoutesPaths.EditProfile}
                content="Изменить данные"
              />
            </S.Action>
            <S.Action>
              <LinkButton
                mode={LinkButtonMode.MAIN}
                href={RoutesPaths.EditPassword}
                content="Изменить пароль"
              />
            </S.Action>
            <S.Action>
              <Button
                content="Выйти"
                mode={ButtonMode.OUTLINE}
                onClick={handleLogput}
              />
            </S.Action>
          </S.Actions>
        </FormLayout>
      </ErrorBoundary>
    </Layout>
  )
}
