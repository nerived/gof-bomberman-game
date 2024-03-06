import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import { PagesRoutes } from './routes'
import ErrorBoundary from './shared/ErrorBoundary'
import { store } from './store'
import { AppInitializer } from './AppInitializer'
import { Loader } from './components/Loader'

function App() {
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <BrowserRouter>
          <AppInitializer />
          <Loader>
            <PagesRoutes />
          </Loader>
        </BrowserRouter>
      </ErrorBoundary>
    </Provider>
  )
}

export default App
