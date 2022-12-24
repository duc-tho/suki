export type ResponseErrorResult = {
    code: number
    error: string[]
}

export type ResponseSuccessResult = {
    code: number
    data: any
}

export class ResponseUtils {
    static createErrorResult(code: number, error: string|string[]): ResponseErrorResult {
        return {
            code,
            error: 'string' === typeof error ? [error] : error
        };
    }

    static createSuccessResult(code: number, data: any): ResponseSuccessResult {
        return {
            code,
            data
        };
    }
}
