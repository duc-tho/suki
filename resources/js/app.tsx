import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ErrorBoundary } from 'react-error-boundary'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router'
import './bootstrap'
import Error from './pages/error'
import { router } from './router'
import { store } from './store'

const appElement = document.getElementById('app')

if (appElement) {
   createRoot(appElement).render(
      <StrictMode>
         <ErrorBoundary FallbackComponent={() => <Error />}>
            <Provider store={store}>
               <div className="flex items-center justify-center">
                  <RouterProvider router={router} />
               </div>
            </Provider>
         </ErrorBoundary>
      </StrictMode>
   )
} else {
   alert('Oops, Something wrong!\nPlease try to reload the page!')
}

if ('serviceWorker' in navigator) {
   window.addEventListener('load', () => {
      navigator.serviceWorker
         .register('/sw.js')
         .then((registration) => {
            console.log('ServiceWorker registered: ', registration)
         })
         .catch((registrationError) => {
            console.log('ServiceWorker registration failed: ', registrationError)
         })
   })
}
