import { FC, FormEvent } from 'react'
import {
  Layout,
  Form,
  FormLayout,
  RowField,
  Button,
  ButtonMode,
  LinkButton,
  LinkButtonMode,
} from '../../ui-kit'
import { RoutesPaths } from '../../routes/constants'

import * as S from './ProfilePassword.styled'
import ErrorBoundary from '../../shared/ErrorBoundary'

const userFields = [
  {
    label: 'Old Password',
    value: 'daw',
    type: 'password',
    placeholder: 'Old Password',
  },
  {
    label: 'New Password',
    value: '',
    type: 'password',
    placeholder: 'New Password',
  },
  {
    label: 'Repeat new password',
    value: '',
    type: 'password',
    placeholder: 'Repeat new password',
  },
]

export const ProfilePassword: FC = () => {
  const handleSave = (e: FormEvent) => {
    e.preventDefault()
    console.log('handleSave')
  }

  return (
    <Layout title={'Изменить пароль'}>
      <S.Root>
        <ErrorBoundary>
          <FormLayout>
            <Form onSubmit={handleSave}>
              <S.Content>
                {userFields.map(field => {
                  return <RowField isEditable {...field} />
                })}
              </S.Content>

              <S.Actions>
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
          </FormLayout>
        </ErrorBoundary>
      </S.Root>
    </Layout>
  )
}
