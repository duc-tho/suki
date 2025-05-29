import HomeIcon from '@/components/icons/home_icon'
import { Route } from '@/router'

export const homeRoute: Route = {
   name: 'Trang Chủ',
   path: '/',
   icon: <HomeIcon />,
   element: <Home />,
   showOnBottomNavigationBar: true,
}

export const defaultHomePath = homeRoute?.path ?? '/'

export default function Home() {
   return <>Home</>
}
