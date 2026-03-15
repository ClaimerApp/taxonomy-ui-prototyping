import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App'
import { DemoSettingsProvider } from './contexts/DemoSettingsContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <DemoSettingsProvider>
        <App />
      </DemoSettingsProvider>
    </HashRouter>
  </React.StrictMode>
)
