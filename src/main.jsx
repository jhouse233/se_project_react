

import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
// import { TemperatureProvider } from './contexts/CurrentTemperatureUnitContext'


import App from './components/App/App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <TemperatureProvider> */}
      <App />
      {/* </TemperatureProvider> */}
    </BrowserRouter>
  </React.StrictMode>
)
