import { Route } from '@/router'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

export const tikdownRoute: Route = {
   name: 'Công cụ tải Video Tiktok',
   path: 'tikdown',
   element: <Tikdown />,
   showOnBottomNavigationBar: false,
}

export default function Tikdown() {
   return (
      <div className="flex h-full flex-col gap-2">
         <div>
            <Input
               className="border-accent h-10 backdrop-blur"
               placeholder="Dán video link vào đây"
            />
         </div>
         <div className="flex w-full gap-2">
            <Button variant="outline" className="w-25 cursor-pointer backdrop-blur">
               Xóa
            </Button>
            <Button className="flex-1 cursor-pointer backdrop-blur">Tìm Kiếm</Button>
            <Button variant="outline" className="w-25 cursor-pointer backdrop-blur">
               Dán Link
            </Button>
         </div>
         <div className="bg-background/20 flex flex-1 items-center justify-center rounded p-2">
            <div className="text-muted-foreground text-center">
               Hãy dán link video Tiktok hoặc Douyin vào ô trên <br />
               và nhấn "Tìm Kiếm"
            </div>
         </div>
      </div>
   )
}
