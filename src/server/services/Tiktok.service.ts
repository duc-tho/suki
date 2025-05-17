import { CONFIGS } from './../core/configs/Config';
import statusCode from 'http-status-codes';
import { Request } from "express";
import { TiktokGetValidateSchema } from "../validations/Tiktok.validate";
import { ValidationUtils } from "../core/utils/Validation.utils";
import { TIKTOK_VALID_DOMAIN } from '../core/constants/Common';
import { ResponseErrorResult, ResponseSuccessResult, ResponseUtils } from '../core/utils/Response.utils';
import axios, { AxiosError } from 'axios';
import logger from '../core/configs/Logger';

type TiktokAPIResponseData = {
    url: string
    description: string
    author: string
    avatar: string
    music: string
    cover: string
    nwm: string
    wm: string
}

export class TiktokService {
    static async handle(request: Request): Promise<ResponseErrorResult|ResponseSuccessResult> {
        const validateResult = ValidationUtils.validateRequest(request, TiktokGetValidateSchema)

        if (validateResult !== true) {
            return validateResult;
        }

        const tiktokUrl = request.query["url"]?.toString() ?? '';
        const isTiktokUrlValid = TIKTOK_VALID_DOMAIN.includes(new URL(tiktokUrl).hostname);

        if (!isTiktokUrlValid) {
            return ResponseUtils.createErrorResult(statusCode.BAD_REQUEST, "URL is not valid");
        }

        let result: ResponseErrorResult|ResponseSuccessResult|null = null;

        await axios.get(`${CONFIGS.TIKTOK_API}${tiktokUrl}`, {
            headers: {
                'accept': 'application/json',
                "Accept-Encoding": "gzip,deflate,compress"
            }
        }).then((response: any) => {
            const responseData = response.data.data;

            const returnDatas: TiktokAPIResponseData = {
                url: tiktokUrl,
                description: responseData.desc,
                author: responseData.author.nickname,
                avatar: responseData.author.avatar_thumb.url_list[0],
                music: responseData.music.title,
                cover: responseData.cover_data.dynamic_cover.url_list[0],
                nwm: responseData.video_data.nwm_video_url,
                wm: responseData.video_data.wm_video_url
            }

            result = ResponseUtils.createSuccessResult(statusCode.OK, returnDatas);
        }).catch((error: AxiosError) => {
            logger.error(error);
            result = ResponseUtils.createErrorResult(statusCode.INTERNAL_SERVER_ERROR, "Can't get video info from tiktok API");
        });

        return result!;
    }
}
