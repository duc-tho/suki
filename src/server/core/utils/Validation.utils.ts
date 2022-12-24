import statusCode from 'http-status-codes';
import { Request } from "express";
import { AnySchema, ValidationErrorItem, ValidationResult } from "joi";
import { ResponseErrorResult, ResponseUtils } from './Response.utils';

export class ValidationUtils {
    static validateRequest(request: Request, validateSchema: AnySchema): true|ResponseErrorResult {
        const validateResults: ValidationResult = validateSchema.validate(request.query)
        let result: true|ResponseErrorResult = true;

        if (validateResults.error) {
            const errorDetails: ValidationErrorItem[] = validateResults.error.details;
            const errorDetailMessages: string[] = errorDetails.map((error: ValidationErrorItem) => error.message);
            result = ResponseUtils.createErrorResult(statusCode.BAD_REQUEST, errorDetailMessages);
        };

        return result;
    }
}
