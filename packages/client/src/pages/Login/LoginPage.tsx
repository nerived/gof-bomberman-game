import { FC, FormEvent } from 'react'
import { Title, PageContainer, Input, Form, Button } from '../../ui-kit'
import { config } from './Config'

export const LoginPage: FC = () => {
  const FormSubmit = (evt: Event) => {
    evt.preventDefault()
  }

  return (
    <PageContainer>
      <Title>Вход</Title>
      <Form>
        {config.map(item => {
          return <Input key={item.id} placeholder={item.placeholder} />
        })}
        <Button title="Вход" onClick={FormSubmit} type="main" />
      </Form>
      <Button title="Регистрация" href="/registration" type="outline" />
    </PageContainer>
  )
}
