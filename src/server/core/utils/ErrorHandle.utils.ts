import { NextFunction, Request, Response } from "express";
import logger from "../configs/Logger";

export default class ErrorHandleUtils {
    static errorHandle(error: Error, req: Request, res: Response, next: NextFunction) {
        logger.error(`\n${error.message}\n${error.stack}`)
        next(error);
    }
}
