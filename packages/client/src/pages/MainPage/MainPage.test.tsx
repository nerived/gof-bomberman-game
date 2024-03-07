import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '../../store'
import { MainPage } from './MainPage'
import { BrowserRouter } from 'react-router-dom'

test('Main page contains a start game link', async () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <MainPage />
      </BrowserRouter>
    </Provider>
  )

  const startGameLink = await screen.findByRole('link', { name: 'START' })
  expect(startGameLink).not.toBeNull()
})
