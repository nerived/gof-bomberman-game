import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

function startServiceWorker() {
  window.addEventListener('load', () => {
    const worker = new URL('../sw.js', import.meta.url).href
    navigator.serviceWorker.register(worker, { scope: './' })
  })
}

startServiceWorker()
