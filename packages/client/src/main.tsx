import React from 'react'
import { hydrateRoot } from 'react-dom/client'
import App from './App'
import './index.css'

hydrateRoot(
  document.getElementById('root') as HTMLElement,
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
