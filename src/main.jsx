import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ThemeProvider } from '@material-tailwind/react'
import { Provider } from 'react-redux'
import {Store, persistor} from './Redux/store.js'
import { PersistGate } from 'redux-persist/integration/react'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { QueryClient,QueryClientProvider } from '@tanstack/react-query'
const queryClient = new QueryClient()


ReactDOM.createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId="607922782020-kveq90ffpc74vgianfkaotsqt3accnaa.apps.googleusercontent.com">

  <React.StrictMode>
    <ThemeProvider>
    <Provider store={Store}>
    <PersistGate loading={null} persistor={persistor}>
    <QueryClientProvider client={queryClient}>
      <App />
      </QueryClientProvider>
      </PersistGate>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
  </GoogleOAuthProvider>
)
