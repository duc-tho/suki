import Joi from 'joi';
import { REGEXS } from '../core/constants/Regex';

export const TiktokGetValidateSchema = Joi.object({
    url: Joi.string()
        .required()
        .regex(new RegExp(REGEXS.URL))
        .messages({
            "string.empty": `URL is required`,
            "string.pattern.base": "URL is not valid"
        })
});
