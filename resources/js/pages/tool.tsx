import ToolIcon from '@/components/icons/tool'
import { Button } from '@/components/ui/button'
import { Route } from '@/router'

export const toolListRoute: Route = {
   name: 'Danh Sách Công Cụ',
   path: ':toolName',
   element: <Tools />,
   showOnBottomNavigationBar: false,
}

export const toolRoute: Route = {
   name: 'Công Cụ',
   path: '/tools',
   element: <Tools />,
   icon: <ToolIcon />,
   showOnBottomNavigationBar: true,
   children: [toolListRoute],
}

type ToolItem = {
   label: string
   description: string
   thumbnail: string
   href: string
}

const toolList: ToolItem[] = [
   {
      label: 'Tikdown',
      description: 'Tiktok downloader by ntho',
      thumbnail: '/images/icons/tikdown-icon.png',
      href: `/${toolRoute.path}/${toolListRoute.path}`,
   },
]

export default function Tools() {
   return (
      toolList.length > 0 &&
      toolList.map(() => (
         <>
            <Button>asd</Button>
         </>
      ))
   )
}
