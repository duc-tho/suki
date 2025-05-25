import { getRandomBackgroundUrl } from "@/lib/utils/background_util copy.js"
import clsx from "clsx"
import { useEffect, useState } from "react"

export default function Background() {
  const [backgroundUrl, setBackgroundUrl] = useState<string>('')
  const [isBackgroundLoaded, setIsBackgroundLoaded] = useState(false)

  useEffect(() => {
    const randomBackgroundUrl = getRandomBackgroundUrl()

    setBackgroundUrl(randomBackgroundUrl)
  }, [])

  const handleVideoLoadedData = () => {
    setIsBackgroundLoaded(true)
  }

  return backgroundUrl && (
    <div
      className={clsx("relative w-full h-dvh overflow-hidden z-10 after:bg-background after:absolute after:inset-0 after:z-20 after:opacity-75 opacity-0 transition-opacity duration-300", isBackgroundLoaded && 'opacity-100')}
    >
      <video
        onLoadedData={handleVideoLoadedData}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        src={backgroundUrl}
      ></video>
    </div >
  )
}
