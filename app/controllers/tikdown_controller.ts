import type { HttpContext } from '@adonisjs/core/http'

export default class TikdownController {
   public async index({ request, response }: HttpContext) {
      const url = request.input('url')

      if (!url) {
         return response.status(400).json({
            message: 'URL is required',
            status: 'Error',
         })
      }

      const data = await fetch(
         `https://douyin.wtf/api/hybrid/video_data?minimal=true&url=${encodeURIComponent(url)}`,
         {
            headers: {
               accept: 'application/json',
            },
         }
      )

      if (!data.ok) {
         return response.status(500).json({
            message: 'Failed to fetch video data',
            status: 'Error',
         })
      }

      const fetchResponseJson: any = await data.json()
      const fetchResponseData = fetchResponseJson.data

      return response.status(200).json({
         url: url,
         description: fetchResponseData.desc,
         author: fetchResponseData.author.nickname,
         avatar: fetchResponseData.author.avatar_thumb.url_list[0],
         music: fetchResponseData.music.title,
         cover: fetchResponseData.cover_data.dynamic_cover.url_list[0],
         nwm: fetchResponseData.video_data.nwm_video_url,
         wm: fetchResponseData.video_data.wm_video_url,
      })
   }
}
