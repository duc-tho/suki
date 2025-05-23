import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Main } from './Main.jsx';
import { Provider } from 'react-redux'
import './bootstrap.js'
import { store } from './store/index.js';

const appElement = document.getElementById('app')

if (appElement) {
  createRoot(appElement).render(
    <StrictMode>
      <Provider store={store}>
        <Main />
      </Provider>
    </StrictMode>
  )
} else {
  alert('Oops, Something wrong!\nPlease try to reload the page!')
}

