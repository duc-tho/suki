import { Route } from '@/router'

export const notFoundRoute: Route = {
   name: 'Không Tìm Thấy Trang',
   path: '/*',
   element: <NotFound />,
   showOnBottomNavigationBar: false,
}

export default function NotFound() {
   return (
      <div className="text-primary z-50 flex h-full w-full flex-col items-center justify-center backdrop-blur">
         <p className="font-bold">404 - Not Found!!</p>
         <p className="font-bold">This page does not exists!</p>
      </div>
   )
}
