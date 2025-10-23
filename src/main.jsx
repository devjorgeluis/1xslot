import { createRoot } from 'react-dom/client'
import AppContextProvider from './AppContext.jsx'

import './css/1xslot.css'
import './css/Login.css'
import './css/Home.css'
import './css/Calendar.css'
import './css/Responsive.css'

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <AppContextProvider>
      <App className="normal-mode app-mode"/>
    </AppContextProvider>
  // </StrictMode>
)