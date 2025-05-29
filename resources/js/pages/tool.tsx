import ToolIcon from '@/components/icons/tool'
import { Route } from '@/router'

export const toolRoute: Route = {
   name: 'Công Cụ',
   path: '/tools',
   element: <Tools />,
   icon: <ToolIcon />,
   showOnBottomNavigationBar: true,
}

export default function Tools() {
   return <>tools</>
}
