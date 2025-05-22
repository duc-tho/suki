if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then(() => console.log("Service worker registered! :>"))
      .catch(err => console.error("Service worker not registered! :<", err))
  })
}
