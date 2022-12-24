import { Request, Response } from "express";
import { TiktokService } from "../services/Tiktok.service";
import { ResponseErrorResult, ResponseSuccessResult } from "../core/utils/Response.utils";

export class TiktokController {
    static async get(request: Request, response: Response) {
        const results: ResponseErrorResult | ResponseSuccessResult = await TiktokService.handle(request);

        if ((results as ResponseErrorResult).error) {
            return response.jsend.error({
                code: results.code,
                message: (results as ResponseErrorResult).error.join(', ')
            });
        }

        return response.jsend.success({
            code: results.code,
            message: "Get tiktok video info success",
            data: (results as ResponseSuccessResult).data
        });
    }
}
