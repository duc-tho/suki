import { store } from '@/store'
import { disableRequireLoading, enableRequireLoading, hide } from '@/store/slices/loading_slide'
import { updateIdle, updateProcessing } from '@/store/slices/update_status_slide'
import axios from 'axios'

export const getAppVersion = () => {
   return (
      (document.head.querySelector('meta[name=app-version]') as HTMLMetaElement)?.content || null
   )
}

/**
 * @returns `true` New version is available and updateAction has executed,
 * @returns `false` App is already up-to-date,
 * @returns `null` Fail to check app version
 */
export const checkForUpdate = async (): Promise<boolean | null> => {
   const currentAppVersion = getAppVersion()
   if (!currentAppVersion) return null
   console.info(`App version ${currentAppVersion}`)

   const res = await axios.get('/api')

   const appVersion = res.data.version
   if (!appVersion) return null

   if (currentAppVersion === appVersion) {
      return false
   }

   console.info(`New version available ${appVersion}`)

   return true
}

export const update = async () => {
   console.info('Start Update!')

   store.dispatch(enableRequireLoading())
   store.dispatch(updateProcessing())

   // Unregister all service workers
   if ('serviceWorker' in navigator) {
      const registrations = await navigator.serviceWorker.getRegistrations()
      for (const registration of registrations) {
         await registration.unregister()
      }
   }

   // Delete all JS, CSS, manifest, and '/' path caches from service worker
   if ('caches' in window) {
      const cacheNames = await caches.keys()

      for (const cacheName of cacheNames) {
         const cache = await caches.open(cacheName)
         const requests = await cache.keys()

         for (const request of requests) {
            const url = new URL(request.url, location.origin)
            if (
               url.pathname === '/' ||
               url.pathname.endsWith('.js') ||
               url.pathname.endsWith('.css') ||
               url.pathname.endsWith('.webmanifest')
            ) {
               await cache.delete(request)
            }
         }
      }
   }

   setTimeout(() => {
      store.dispatch(disableRequireLoading())
      store.dispatch(updateIdle())
   }, 5000)

   setTimeout(() => {
      store.dispatch(hide())
      window.location.reload()
   }, 7000)
}
