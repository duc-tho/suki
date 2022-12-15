import winston from 'winston';

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.json(),
        winston.format.colorize(),
        winston.format.splat(),
        winston.format.printf(({ level, message }) => `${level}: ${message}`)
    ),
    transports: [
        new winston.transports.File({ filename: '../../logs/error.log', level: 'error' }),
        new winston.transports.Console({
            format: winston.format.colorize(),
        })
    ],
});

export default logger;
