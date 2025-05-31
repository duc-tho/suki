import { Link } from 'react-router'
import { Button } from '../ui/button'

export type ToolItemProps = {
   label: string
   description: string
   thumbnail: string
   href: string
}

export default function ToolItem({ label, description, thumbnail, href }: ToolItemProps) {
   return (
      <Link to={href}>
         <Button
            variant="outline"
            className="h-15 w-full cursor-pointer justify-start backdrop-blur"
         >
            <img src={thumbnail} alt={description} className="w-7" loading="lazy" />
            <div className="flex flex-col text-left">
               <span className="font-bold">{label}</span>
               <span className="text-muted-foreground text-sm">{description}</span>
            </div>
         </Button>
      </Link>
   )
}
