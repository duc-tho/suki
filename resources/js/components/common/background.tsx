import { getRandomBackgroundUrl } from '@/lib/utils/background_util'
import clsx from 'clsx'
import { useEffect, useState } from 'react'

export default function Background() {
   const [backgroundUrl, setBackgroundUrl] = useState('')
   const [isBackgroundLoaded, setIsBackgroundLoaded] = useState(false)

   useEffect(() => {
      const randomBackgroundUrl = getRandomBackgroundUrl()

      setBackgroundUrl(randomBackgroundUrl)
   }, [])

   const handleVideoLoadedData = () => {
      setIsBackgroundLoaded(true)
   }

   return (
      backgroundUrl && (
         <div
            className={clsx(
               'after:bg-background relative top-0 left-0 z-10 min-h-dvh w-full overflow-hidden opacity-0 transition-opacity duration-300 after:absolute after:inset-0 after:z-20 after:opacity-75',
               isBackgroundLoaded && 'pointer-none opacity-100'
            )}
         >
            <video
               onLoadedData={handleVideoLoadedData}
               className="absolute inset-0 min-h-dvh w-full object-cover"
               autoPlay
               loop
               muted
               playsInline
               src={backgroundUrl}
            ></video>
         </div>
      )
   )
}
