import clsx from 'clsx'
import SpinIcon from './icons/spin_icon.jsx'
import { useEffect, useState } from 'react'
import { getRandomMenheraStickerUrl } from '@/lib/utils/sticker_util.js'
import { useDispatch, useSelector } from '@/store/hooks.js'
import { hide, selectLoading } from '@/store/slices/loading_slide.js'

const LOADING_HIDE_TIMEOUT = 1000 // milliseconds
const RESET_STICKER_STATE_TIMEOUT = LOADING_HIDE_TIMEOUT + 300 // milliseconds

let loadingHideTimeoutId: NodeJS.Timeout | null = null
let resetStickerStateTimeoutId: NodeJS.Timeout | null = null

export default function Loading() {
  const { open } = useSelector(selectLoading)
  const [isStickerLoaded, setIsStickerLoaded] = useState(false)
  const [sticker, setSticker] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()

  const resetStickerState = () => {
    if (resetStickerStateTimeoutId) {
      clearTimeout(resetStickerStateTimeoutId)
      resetStickerStateTimeoutId = null
    }

    resetStickerStateTimeoutId = setTimeout(() => {
      setIsStickerLoaded(false)
      setSticker('')
    }, RESET_STICKER_STATE_TIMEOUT)
  }

  const hideLoading = () => {
    if (loadingHideTimeoutId) {
      clearTimeout(loadingHideTimeoutId)
      loadingHideTimeoutId = null
    }

    loadingHideTimeoutId = setTimeout(() => {
      setIsLoading(false)
    }, LOADING_HIDE_TIMEOUT)

    resetStickerState()
  }

  const handleReadyStateChange = () => {
    if (document.readyState !== 'complete') {
      document.addEventListener('readystatechange', handleReadyStateChange)
      return
    }

    dispatch(hide())
  }

  useEffect(() => {
    handleReadyStateChange()
  }, [])

  useEffect(() => {
    if (!open) {
      hideLoading()

      return
    }

    if (open && isLoading) {
      if (loadingHideTimeoutId) {
        clearTimeout(loadingHideTimeoutId)
        loadingHideTimeoutId = null
      }

      if (resetStickerStateTimeoutId) {
        clearTimeout(resetStickerStateTimeoutId)
        resetStickerStateTimeoutId = null
      }

      return
    }

    setIsLoading(true)
    setSticker(getRandomMenheraStickerUrl())
  }, [open])

  return (
    <div
      className={clsx(
        'flex flex-col min-w-full min-h-dvh absolute top-0 left-0 z-50 items-center justify-center backdrop-blur-md gap-4 bg-[#00000090] transition-opacity duration-300',
        isLoading ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      )}
    >
      <div className="w-32 h-32">
        {!!sticker && (
          <img
            src={sticker}
            alt="Loading ..."
            className={clsx(
              'w-32 h-32 object-cover rounded-full transition-opacity duration-300',
              isStickerLoaded ? 'opacity-100' : 'opacity-0'
            )}
            onLoad={() => setIsStickerLoaded(true)}
            onError={() => setIsStickerLoaded(false)}
          />
        )}
      </div>
      <div className="flex flex-wrap items-center justify-center">
        <span>Đang tải</span>
        <pre>
          {' '}
          <SpinIcon rotate className="fill-foreground inline align-baseline" sizePx={12} />
          (&gt;﹏&lt;)
          <SpinIcon rotate className="fill-foreground inline align-baseline" sizePx={12} />{' '}
        </pre>
        <span>đợi xíu!!!</span>
      </div>
    </div>
  )
}
