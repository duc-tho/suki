import { BACKGROUND_FILE_NAMES, BACKGROUND_URL_PATH } from "../constants/video.js";

export const getRandomBackgroundUrl = (): string => {
  const randomIndex: number = Math.floor(Math.random() * BACKGROUND_FILE_NAMES.length);

  return `${BACKGROUND_URL_PATH}/${BACKGROUND_FILE_NAMES[randomIndex]}`;
}
