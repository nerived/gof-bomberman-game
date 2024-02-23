import { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { PagesRoutes } from './routes'

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
    <BrowserRouter>
      <PagesRoutes />
    </BrowserRouter>
  )
}

export default App
