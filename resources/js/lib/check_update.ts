import { checkForUpdate, update } from './utils/app_util'

export default (async () => {
   const shouldUpdate = await checkForUpdate()

   if (!shouldUpdate) return

   await update()
})()
