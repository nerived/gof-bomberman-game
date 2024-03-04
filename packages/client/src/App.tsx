import { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import { PagesRoutes } from './routes'
import ErrorBoundary from './shared/ErrorBoundary'
import { store } from './store'
import { AppInitializer } from './AppInitializer'

function App() {
  useEffect(() => {
    // const fetchServerData = async () => {
    //   const url = `http://localhost:${__SERVER_PORT__}`
    //   const response = await fetch(url)
    //   const data = await response.json()
    //   console.log(data)
    // }
    // fetchServerData()
  }, [])

  return (
    <Provider store={store}>
      <ErrorBoundary>
        <BrowserRouter>
          <AppInitializer />
          <PagesRoutes />
        </BrowserRouter>
      </ErrorBoundary>
    </Provider>
  )
}

export default App
