import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import { PagesRoutes } from './routes'
import ErrorBoundary from './shared/ErrorBoundary'
import { store } from './store'
import { AppInitializer } from './AppInitializer'
import { Loader } from './components/Loader'
import { PopupManager } from './components/PopupManager'

function App() {
  return <div>START SSR RENDER</div>

  return (
    <Provider store={store}>
      <ErrorBoundary>
        <BrowserRouter>
          <AppInitializer />
          <Loader>
            <PagesRoutes />
          </Loader>
          <PopupManager />
        </BrowserRouter>
      </ErrorBoundary>
    </Provider>
  )
}

export default App
