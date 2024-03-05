import App from './App'
import { render, screen } from '@testing-library/react'

// @ts-ignore
global.fetch = jest.fn(() =>
  Promise.resolve({ json: () => Promise.resolve('hey') })
)

test('Redirects unauthenticated user to login', async () => {
  render(<App />)
  const loginElement = await screen.findByText('Регистрация')
  expect(loginElement).toBeDefined()
})
