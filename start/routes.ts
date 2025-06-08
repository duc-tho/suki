/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { env } from 'node:process'
const TikdownController = () => import('#controllers/tikdown_controller')
const HomeController = () => import('#controllers/home_controller')

router
   .group(() => {
      router.get('/', [HomeController, 'index']).as('home.index')

      // Tikdown route
      router.get('tikdown', [TikdownController, 'index']).as('tikdown.index')
   })
   .prefix('api')

router.on('/*').render('pages/home', { env })
