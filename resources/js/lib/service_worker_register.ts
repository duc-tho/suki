if ('serviceWorker' in navigator && import.meta.env.PROD) {
   window.addEventListener('load', function () {
      navigator.serviceWorker
         .register('/sw.js')
         .then((registration) => console.log('Service worker registered! :>\n', registration))
         .catch((registrationError) =>
            console.error('Service worker not registered! :<', registrationError)
         )
   })
}
