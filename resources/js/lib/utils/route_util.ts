import { homeRoute } from '@/pages/home'
import { Route, routes } from '@/router'

export function flattenRoutes(routeList: Route[]): Route[] {
   const result: Route[] = []

   for (const route of routeList) {
      // Thêm route hiện tại
      result.push(route)

      // Nếu có children, tiếp tục đệ quy
      if (!route.children || route.children.length <= 0) {
         continue
      }

      const childList = flattenRoutes(route.children as Route[])
      result.push(...childList)
   }

   return result
}

export function findRouteByPath(path: string): Route | null {
   const result: Route[] = []

   if (path === homeRoute.path) {
      return homeRoute
   }

   const pathSegments = path
      .replace(/^\/+|\/+$/g, '')
      .split('/')
      .filter(Boolean)

   const routeCheck = (route: Route, segmentLevel: number = 0) => {
      if (!route.path) return

      if (segmentLevel < pathSegments.length - 1 && route.children && route.children?.length <= 0) {
         return
      }

      const routeSegments = route.path
         .replace(/^\/+|\/+$/g, '')
         .split('/')
         .filter(Boolean)

      if (pathSegments[segmentLevel] !== routeSegments[0]) {
         return
      }

      if (segmentLevel === pathSegments.length - 1) {
         result.push(route)
         return
      }

      route.children?.forEach((childRoute) => {
         routeCheck(childRoute as Route, segmentLevel + 1)
      })
   }

   routes.forEach((route) => routeCheck(route))

   return result.length > 0 ? result[0] : null
}
