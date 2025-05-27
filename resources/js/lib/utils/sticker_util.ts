import { MENHERA_STICKER_FILE_NAMES, MENHERA_STICKER_URL_PATH } from '../constants/sticker'

export const getRandomStickerUrl = (stickerFileNames: string[], stickerPath: string): string => {
   const randomStickerIndex: number = Math.floor(Math.random() * stickerFileNames.length)

   return `${stickerPath}${stickerFileNames[randomStickerIndex]}`
}

export const getRandomMenheraStickerUrl = (): string => {
   return getRandomStickerUrl(MENHERA_STICKER_FILE_NAMES, MENHERA_STICKER_URL_PATH)
}
