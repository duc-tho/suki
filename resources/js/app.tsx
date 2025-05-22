import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Main } from './Main.jsx';
import './bootstrap.js'

const appElement = document.getElementById('app')

if (appElement) {
  createRoot(appElement).render(
    <StrictMode>
      <Main />
    </StrictMode>
  )
} else {
  alert('Oops, Something wrong!\nPlease try to reload the page!')
}

