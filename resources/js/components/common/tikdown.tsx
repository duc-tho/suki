import { Route } from '@/router'
import axios from 'axios'
import { ChangeEvent, useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Skeleton } from '../ui/skeleton'

export const tikdownRoute: Route = {
   name: 'Công cụ tải Video Tiktok',
   path: 'tikdown',
   element: <Tikdown />,
   showOnBottomNavigationBar: false,
}

export default function Tikdown() {
   const [urlInput, setUrlInput] = useState('')
   const [urls, setUrls] = useState<string[]>([])
   const [selectedUrl, setSelectedUrl] = useState<string | null>(null)
   const [videoInfo, setVideoInfo] = useState<any>(null)
   const [isProcessing, setIsProcessing] = useState(false)

   const handleUrlChange = (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value

      if (!value) {
         setUrlInput('')
         return
      }

      setUrlInput(value)
   }

   const handlePaste = () => {
      navigator.clipboard
         .readText()
         .then((text) => {
            setUrlInput(text)
         })
         .catch((err) => {
            console.error('Failed to read clipboard contents: ', err)

            toast('Dán link thất bại!', {
               description: 'Đã có lỗi xảy ra khi dán Link hãy thử lại hoặc dán thủ công.',
            })
         })
   }

   const fetchVideoInfo = async () => {
      if (!selectedUrl) return

      setVideoInfo(null)
      setIsProcessing(true)

      try {
         const response = await fetch(`/api/tikdown?url=${encodeURIComponent(selectedUrl)}`)

         if (!response.ok) {
            throw new Error('Failed to fetch video info')
         }

         const data = await response.json()
         setVideoInfo(data)
         console.log(data)
      } catch (error) {
         console.error('Error fetching video info:', error)
         toast('Lỗi tải video!', {
            description: 'Đã có lỗi xảy ra khi tải video, vui lòng thử lại sau.',
         })
      } finally {
         setIsProcessing(false)
      }
   }

   const handleClear = () => {
      setIsProcessing(false)
      setSelectedUrl(null)
      setVideoInfo(null)
      setUrlInput('')
      setUrls([])
   }

   const handleDownload = async (noWatermark: boolean = true) => {
      axios({
         url: noWatermark ? videoInfo?.nwm : videoInfo?.wm,
         method: 'GET',
         responseType: 'blob',
         headers: {
            'Content-type': 'application/octet-stream',
         },
      }).then((response) => {
         let link = document.createElement('a')

         link.target = '_blank'
         link.download = `${new Date().getTime()}.mp4`
         link.href = URL.createObjectURL(new Blob([response.data], { type: 'video/mp4' }))
         link.download = ''
         link.click()
         link.remove()

         toast('Yêu cầu tải video thành công')
      })
   }

   useEffect(() => {
      if (!urlInput) {
         return
      }

      const handler = setTimeout(() => {
         const urlRegex = /https?:\/\/[^\s]+/g
         const allMatches = urlInput.match(urlRegex) || []

         // Lọc theo domain TikTok hoặc Douyin
         const filteredLinks = allMatches.filter((link) => {
            const domain = new URL(link).hostname

            return domain.includes('tiktok.com') || domain.includes('douyin.com')
         })

         if (!filteredLinks.length) {
            toast('Link không hợp lệ!', {
               description: 'Vui lòng dán một link video Tiktok hợp lệ.',
            })
         }

         setUrls(filteredLinks)
      }, 400)

      return () => clearTimeout(handler)
   }, [urlInput])

   useEffect(() => {
      if (urls.length > 0) {
         setSelectedUrl(urls[0])
      } else {
         setSelectedUrl(null)
      }
   }, [urls])

   useEffect(() => {
      if (!selectedUrl) return

      fetchVideoInfo()
   }, [selectedUrl])

   return (
      <div className="flex h-full flex-col gap-2">
         <div>
            <Input
               className="border-accent h-10 backdrop-blur"
               placeholder="Dán video link vào đây"
               value={urlInput}
               onChange={handleUrlChange}
               disabled={isProcessing}
            />
         </div>
         <div className="flex w-full gap-2">
            <Button
               variant="outline"
               className="w-25 cursor-pointer backdrop-blur"
               disabled={isProcessing}
               onClick={handleClear}
            >
               Xóa
            </Button>
            <Button className="flex-1 cursor-pointer backdrop-blur" disabled={isProcessing}>
               Tìm Kiếm
            </Button>
            <Button
               variant="outline"
               className="w-25 cursor-pointer backdrop-blur"
               onClick={handlePaste}
               disabled={isProcessing}
            >
               Dán Link
            </Button>
         </div>
         <div className="bg-background/20 flex flex-1 flex-col items-center justify-center gap-2 rounded p-2">
            {isProcessing ? (
               <>
                  <div className="flex w-full items-center gap-2">
                     <Skeleton className="bg-secondary h-8 w-8 rounded-full" />
                     <Skeleton className="bg-secondary h-full flex-1" />
                  </div>
                  <div className="bg-background/50 relative flex w-full flex-1 items-center justify-center rounded backdrop-blur">
                     <Skeleton className="bg-secondary h-full w-full" />
                  </div>
                  <div className="w-full">
                     <Skeleton className="bg-secondary mb-2 h-6 w-full" />
                     <Skeleton className="bg-secondary h-6 w-full" />
                  </div>
                  <div className="w-full">
                     <Skeleton className="bg-secondary h-10 w-full" />
                  </div>
               </>
            ) : !videoInfo ? (
               <div className="text-muted-foreground text-center">
                  Hãy dán link video Tiktok hoặc Douyin vào ô trên và nhấn "Tìm Kiếm"
               </div>
            ) : (
               <>
                  <div className="flex w-full items-center gap-2">
                     <Avatar className="h-7 w-7">
                        <AvatarImage src={videoInfo.avatar} alt={videoInfo.author} />
                        <AvatarFallback>?</AvatarFallback>
                     </Avatar>
                     <span className="font-bold">{videoInfo.author ?? 'Người dùng'}</span>
                  </div>
                  <div className="bg-background/50 relative flex w-full flex-1 items-center justify-center rounded backdrop-blur">
                     <video
                        className="absolute inset-0 h-full w-full object-contain"
                        controls
                        autoPlay
                        loop
                        onLoadStart={(event) => {
                           if (!event.currentTarget) {
                              return
                           }

                           event.currentTarget.volume = 0.4
                        }}
                        src={videoInfo.nwm}
                     ></video>
                  </div>
                  <div className="w-full">
                     {videoInfo.description && (
                        <div>
                           <span className="font-bold">Mô tả: </span>
                           {videoInfo.description}
                        </div>
                     )}
                     <div className="w-full overflow-hidden text-ellipsis whitespace-nowrap">
                        <span className="font-bold">Liên kết: </span>
                        <a href={selectedUrl ?? '#'} target="_blank">
                           {selectedUrl ?? 'Chưa có thông tin!'}
                        </a>
                     </div>
                  </div>
                  <div className="flex w-full flex-wrap gap-2">
                     {videoInfo?.nwm || videoInfo?.wm ? (
                        <>
                           {videoInfo?.wm && (
                              <Button
                                 className="grow cursor-pointer backdrop-blur"
                                 onClick={() => handleDownload(false)}
                              >
                                 Tải video có nguồn
                              </Button>
                           )}
                           {videoInfo?.nwm && (
                              <Button
                                 className="grow cursor-pointer backdrop-blur"
                                 onClick={() => handleDownload()}
                              >
                                 Tải video không nguồn
                              </Button>
                           )}
                        </>
                     ) : (
                        <Button className="grow backdrop-blur" disabled>
                           Rất tiếc hiện không thể tải được video này!
                        </Button>
                     )}
                  </div>
               </>
            )}
         </div>
      </div>
   )
}
