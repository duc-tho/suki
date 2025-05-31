import { tikdownRoute } from '@/components/common/tikdown'
import ToolItem, { ToolItemProps } from '@/components/common/tool_item'
import ToolIcon from '@/components/icons/tool'
import { CHECK_EXACT_URL_PATH, isCurrentURLPath } from '@/lib/utils/location_util'
import { Route } from '@/router'
import { Outlet, useLocation } from 'react-router'

export const toolRoute: Route = {
   name: 'Công Cụ',
   path: '/tools',
   element: <Tools />,
   icon: <ToolIcon />,
   children: [tikdownRoute],
   showOnBottomNavigationBar: true,
}

const toolList: ToolItemProps[] = [
   {
      label: 'Tikdown',
      description: 'Tiktok downloader tool made by ntho',
      thumbnail: '/images/icons/tikdown-icon.png',
      href: `${toolRoute.path}/${tikdownRoute.path}`,
   },
]

export default function Tools() {
   const location = useLocation()

   if (!isCurrentURLPath(location.pathname, toolRoute.path ?? '', CHECK_EXACT_URL_PATH)) {
      return <Outlet />
   }

   return (
      toolList.length > 0 &&
      toolList.map((toolItem) => <ToolItem key={crypto.randomUUID()} {...toolItem} />)
   )
}
