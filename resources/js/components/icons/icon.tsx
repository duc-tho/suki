import clsx from 'clsx'
import { cloneElement, PropsWithChildren, ReactSVGElement } from 'react'

export type IconProps = PropsWithChildren & {
   className?: string
   rotate?: boolean
   bounce?: boolean
   sizePx?: number
   color?: string
}

export default function Icon({
   className,
   sizePx = 16,
   rotate = false,
   bounce = false,
   children,
}: IconProps) {
   return cloneElement(children as ReactSVGElement, {
      className: clsx(
         className,
         rotate && 'animate-[spin_1.2s_linear_infinite]',
         bounce && 'animate-[bounce_1.2s_linear_infinite]'
      ),
      width: sizePx,
   })
}
