import { FC, FormEvent } from 'react'
import {
  Layout,
  Form,
  FormLayout,
  Avatar,
  RowField,
  Button,
  ButtonMode,
  LinkButton,
  LinkButtonMode,
} from '../../ui-kit'
import { RoutesPaths } from '../../routes/constants'

import * as S from './ProfileEdit.styled'
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

export const ProfileEdit: FC = () => {
  const handleSave = (e: FormEvent) => {
    e.preventDefault
    console.log('handleSave')
  }

  return (
    <Layout title={'Изменить данные'}>
      <ErrorBoundary>
        <FormLayout>
          <Form onSubmit={handleSave}>
            <S.Head>
              <ErrorBoundary>
                <Avatar name="Иван" />
              </ErrorBoundary>
            </S.Head>

            <S.Content>
              {userFields.map(field => {
                return <RowField {...field} isEditable />
              })}
            </S.Content>

            <S.Actions>
              <S.Action>
                <Button
                  content="Сохранить"
                  mode={ButtonMode.MAIN}
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
        </FormLayout>
      </ErrorBoundary>
    </Layout>
  )
}
