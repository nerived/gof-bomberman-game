import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import { PagesRoutes } from './routes'
import ErrorBoundary from './shared/ErrorBoundary'
import { store } from './store'
import { AppInitializer } from './AppInitializer'
import { Loader } from './components/Loader'
import { PopupManager } from './components/PopupManager'
import { MainPage } from './pages/MainPage'

function App() {
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <div>SSR RENDER</div>
        {/* <BrowserRouter>
          <AppInitializer />
          <Loader>
            <PagesRoutes />
          </Loader>
          <PopupManager />
        </BrowserRouter> */}
      </ErrorBoundary>
    </Provider>
  )
}

export default App
