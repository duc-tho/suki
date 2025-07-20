import { toolRoute } from '@/pages/tool'
import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router'
import { tikdownRoute } from './tikdown'

export const ShareHandler = () => {
   const [searchParams] = useSearchParams()
   const navigate = useNavigate()

   useEffect(() => {
      const urlPattern = /^https:\/\/(www\.)?(vt\.)?tiktok\.com\/.+/
      const url = searchParams.get('url')
      const title = searchParams.get('title')
      const text = searchParams.get('text')

      const data = [url, title, text]

      if (!data || data.length === 0) {
         navigate('/', { replace: true })
      }

      const targetUrl = data.find((item) => item && urlPattern.test(item))

      if (!targetUrl) {
         navigate('/', { replace: true })
         return
      }

      navigate(`${toolRoute.path}/${tikdownRoute.path}?url=${encodeURIComponent(targetUrl)}`, {
         replace: true,
      })
   }, [searchParams, navigate])

   return null
}
