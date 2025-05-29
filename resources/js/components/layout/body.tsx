import { Outlet } from 'react-router'

export default function Body() {
   return (
      <main className="flex-1">
         <Outlet />
      </main>
   )
}
