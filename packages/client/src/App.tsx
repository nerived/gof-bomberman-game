import { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { PagesRoutes } from './routes'
import ErrorBoundary from './shared/ErrorBoundary'
import AuthAPI from './api/AuthAPI'
import { useAuth } from './shared/model/auth/useAuth'

function App() {
  const { login, isLoggedIn } = useAuth()

  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}`
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
    }

    fetchServerData()

    const checkIfUserLoggedIn = async () => {
      try {
        const response = await AuthAPI.read()
        console.log('Is user logged in?', response.id)

        if (response.id) {
          login()
          console.log('user is logged in, set isLoggedIn context to true')
        }
      } catch (error) {
        console.log(error)
      }
    }

    checkIfUserLoggedIn()

    console.log('is user logged in?', isLoggedIn)
  }, [])

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <PagesRoutes />
      </BrowserRouter>
    </ErrorBoundary>
  )
}

export default App
