import { ReactElement } from 'react'
import { createBrowserRouter, RouteObject } from 'react-router'
import { ShareHandler } from './components/common/share_handler'
import { Main } from './components/main'
import { homeRoute } from './pages/home'
import { notFoundRoute } from './pages/not_found'
import { toolRoute } from './pages/tool'

export type Route = RouteObject & {
   name: string
   showOnBottomNavigationBar: boolean
   icon?: ReactElement
}

export const routes: Route[] = [homeRoute, toolRoute, notFoundRoute]

export const router = createBrowserRouter([
   {
      path: '/',
      Component: () => <Main />,
      children: routes,
   },
   {
      path: '/share',
      Component: () => <ShareHandler />,
   },
])
