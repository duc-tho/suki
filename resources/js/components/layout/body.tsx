import { Outlet } from 'react-router'

export default function Body() {
   return (
      <main className="w-full flex-grow-1 p-2">
         <Outlet />
      </main>
   )
}
