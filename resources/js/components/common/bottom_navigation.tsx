import { isCurrentURLPath } from '@/lib/utils/location_util'
import { routes } from '@/router'
import clsx from 'clsx'
import { Link, useLocation } from 'react-router'

export default function BottomNavigation() {
   const location = useLocation()

   return (
      <div className="bg-background/10 border-background flex h-[70px] w-full justify-around overflow-hidden rounded border backdrop-blur">
         {routes.map((route) => {
            const isRouteActive = isCurrentURLPath(location.pathname, route.path ?? '')

            return (
               route.showOnBottomNavigationBar &&
               route.path && (
                  <Link key={crypto.randomUUID()} to={route.path} className="group">
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
