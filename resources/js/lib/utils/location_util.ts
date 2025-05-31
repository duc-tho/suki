import { defaultHomePath } from '@/pages/home'

export const CHECK_EXACT_URL_PATH = true

export const isCurrentURLPath = (
   curentPath: string,
   checkPath: string,
   exact: boolean = !CHECK_EXACT_URL_PATH
): boolean => {
   const normalizedPath = curentPath.replace(/\/+$/, '') || defaultHomePath

   if (exact || normalizedPath === '/') {
      return normalizedPath === checkPath
   }

   const pathParts = normalizedPath.split('/').filter((path) => path !== '')

   if (pathParts.length === 0) {
      return false
   }

   return checkPath.includes(pathParts[0])
}
