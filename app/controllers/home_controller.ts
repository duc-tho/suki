import type { HttpContext } from '@adonisjs/core/http'

export default class HomeController {
   public async index({ response }: HttpContext) {
      return response.status(200).json({
         message: 'Suki API',
         status: 'Online',
      })
   }
}
