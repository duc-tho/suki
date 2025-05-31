import { findRouteByPath } from '@/lib/utils/route_util'
import { defaultHomePath } from '@/pages/home'
import clsx from 'clsx'
import { Link, useLocation } from 'react-router'
import HomeIcon from '../icons/home_icon'
import { Button } from '../ui/button'

export default function Header() {
   const location = useLocation()
   const normalizedPath = location?.pathname?.replace(/\/+$/, '') || defaultHomePath
   const currentRoute = findRouteByPath(location?.pathname)
   const pageName = currentRoute ? currentRoute.name : 'Trang'

   return (
      <header className="flex w-full items-center justify-between gap-2 p-2">
         <Link
            to={defaultHomePath}
            className={clsx(
               normalizedPath === defaultHomePath
                  ? 'pointer-events-none cursor-none'
                  : 'cursor-pointer'
            )}
            children={
               <Button
                  variant="outline"
                  size="icon"
                  className={clsx(
                     'group backdrop-blur',
                     normalizedPath === defaultHomePath
                        ? 'pointer-events-none cursor-none'
                        : 'cursor-pointer'
                  )}
               >
                  <HomeIcon
                     className={clsx(
                        'transition-colors',
                        normalizedPath === defaultHomePath
                           ? 'fill-primary group-hover:fill-primary'
                           : 'group-hover:fill-foreground fill-white'
                     )}
                  />
               </Button>
            }
         />

         <Button variant="outline" size="icon" className="pointer-events-none flex-1 backdrop-blur">
            {pageName}
         </Button>
      </header>
   )
}
