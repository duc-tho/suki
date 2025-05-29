import { defaultHomePath } from '@/pages/home'
import { routes } from '@/router'
import clsx from 'clsx'
import { Link, useLocation } from 'react-router'

export default function BottomNavigation() {
   const location = useLocation()
   const normalizedPath = location?.pathname?.replace(/\/+$/, '') || defaultHomePath
   const currentRoute = routes.find((route) => route.path === normalizedPath)

   return (
      <div className="bg-foreground/10 flex h-[70px] w-full justify-around overflow-hidden rounded backdrop-blur">
         {routes.map((route) => {
            const isRouteActive = currentRoute && route === currentRoute

            return (
               route.showOnBottomNavigationBar &&
               route.path && (
                  <Link to={route.path} className="group">
                     <div className="flex h-full cursor-pointer flex-col items-center justify-center gap-2 rounded-none border-none px-3">
                        {route.icon && (
                           <span
                              className={clsx(
                                 'transition-colors',
                                 isRouteActive
                                    ? 'fill-primary group-hover:fill-primary pointer-events-none cursor-none'
                                    : 'group-hover:fill-foreground cursor-pointer fill-white'
                              )}
                           >
                              {route.icon}
                           </span>
                        )}
                        <small className={clsx('font-bold', isRouteActive && 'text-primary')}>
                           {route.name}
                        </small>
                     </div>
                  </Link>
               )
            )
         })}
      </div>
   )
}
