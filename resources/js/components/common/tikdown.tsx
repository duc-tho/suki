import { Route } from '@/router'
import axios from 'axios'
import { ChangeEvent, useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

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
      }
   }

   const handleDownload = async () => {
      axios({
         url: videoInfo?.nwm,
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
            />
         </div>
         <div className="flex w-full gap-2">
            <Button variant="outline" className="w-25 cursor-pointer backdrop-blur">
               Xóa
            </Button>
            <Button className="flex-1 cursor-pointer backdrop-blur">Tìm Kiếm</Button>
            <Button
               variant="outline"
               className="w-25 cursor-pointer backdrop-blur"
               onClick={handlePaste}
            >
               Dán Link
            </Button>
         </div>
         <div className="bg-background/20 flex flex-1 flex-col items-center justify-center gap-2 rounded p-2">
            {!videoInfo ? (
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
                        <a href="https://img.pikbest.com/10/73/95/12BpIkbEsTfeM.mp4">
                           https://img.pikbest.com/10/73/95/12BpIkbEsTfeM.mp4
                        </a>
                     </div>
                  </div>
                  <div className="w-full">
                     <Button
                        className="w-full cursor-pointer backdrop-blur"
                        onClick={handleDownload}
                     >
                        Tải xuống
                     </Button>
                  </div>
               </>
            )}
         </div>
      </div>
   )
}
