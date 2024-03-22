import App from './App'
import { render, screen } from '@testing-library/react'

// @ts-ignore
global.fetch = jest.fn(() =>
  Promise.resolve({ json: () => Promise.resolve('hey') })
)

test('Redirects user to main page', async () => {
  render(<App />)
  const loginElement = await screen.getByText('START SSR RENDER')
  expect(loginElement).toBeDefined()
})
