import { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { PagesRoutes } from './routes'
import ErrorBoundary from './shared/ErrorBoundary'

function App() {
  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}`
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
    }

    fetchServerData()
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
