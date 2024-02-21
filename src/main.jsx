import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import './bootstrap.min.css'
import Contextshare from './context/Contextshare.jsx'
import TokenShare from './context/TokenShare.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
<TokenShare>
      <Contextshare>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Contextshare>
</TokenShare>
  </React.StrictMode>,
)
