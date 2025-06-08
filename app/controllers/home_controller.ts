import { appVersion } from '#config/app'
import type { HttpContext } from '@adonisjs/core/http'

export default class HomeController {
   public async index({ response }: HttpContext) {
      return response.status(200).json({
         message: 'Suki API',
         status: 'Online',
         version: appVersion,
      })
   }

   public async reloadApp({ response }: HttpContext) {
      return response.header('Clear-Site-Data', '"storage"').redirect('/')
   }
}
