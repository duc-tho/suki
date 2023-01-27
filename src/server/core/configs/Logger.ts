import winston from 'winston';

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.json(),
        winston.format.timestamp(),
        winston.format.printf(({ level, message, stack }) => `[${new Date()}]\n${level}: ${message}\n${stack ?? ''}\n`)
    ),
    transports: [
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.Console({
            format: winston.format.colorize(),
            stderrLevels: ['error'],
        })
    ],
});

export default logger;
