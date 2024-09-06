import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import MovieContextProvider from './components/MovieContext.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MovieContextProvider>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </MovieContextProvider>
  </StrictMode>
)
