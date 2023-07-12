import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { HashRouter } from 'react-router-dom'
import { UserProvider } from './hooks/userInfo.jsx'
import { HelmetProvider } from 'react-helmet-async'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <HashRouter>
        <UserProvider>
          <App />
        </UserProvider>

      </HashRouter>
    </HelmetProvider>

  </React.StrictMode>,
)
