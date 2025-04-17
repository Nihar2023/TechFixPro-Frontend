import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AppContextProvider from './Context/AppContext.jsx'
import DeviceContextProvider from './Context/deviceContext.jsx'

import {BrowserRouter} from 'react-router-dom'
import CartProvider from './Context/CartContext.jsx'
import UserContextProvider from './Context/UserContext.jsx'
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <UserContextProvider>
    <AppContextProvider>
      <DeviceContextProvider>
        <CartProvider>
        <App />
        </CartProvider>
      </DeviceContextProvider>
    </AppContextProvider>
    </UserContextProvider>
  </BrowserRouter>,
)
