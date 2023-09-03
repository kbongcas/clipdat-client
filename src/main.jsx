import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { Auth0Provider } from '@auth0/auth0-react'

//@TODO - this should be taken out if when hosting
const domain = import.meta.env.VITE_AUTH0_DOMAIN
const clientId  = import.meta.env.VITE_AUTH0_CLIENT_ID
const audience  = import.meta.env.VITE_AUTH0_AUDIENCE

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      useRefreshTokens={true}
      cacheLocation="localstorage"
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: audience,
        scope: 'openid profile email offline_access'
      }}>
      <App />
    </Auth0Provider>
  </React.StrictMode>,
)
