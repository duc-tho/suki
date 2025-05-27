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
               'after:bg-background opacity-0 after:opacity-75',
               isBackgroundLoaded &&
                  'relative z-10 h-dvh w-full overflow-hidden' +
                     'opacity-100 transition-opacity duration-300' +
                     'after:absolute after:inset-0 after:z-20'
            )}
         >
            <video
               onLoadedData={handleVideoLoadedData}
               className="absolute inset-0 h-full w-full object-cover"
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
