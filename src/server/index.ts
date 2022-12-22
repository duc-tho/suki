import app from "./app";
import logger from "./core/configs/logger";
import mongoose, { connect } from 'mongoose';
import { DEFAULTS } from "./core/constants/defaults";

mongoose.set('strictQuery', false);
connect(
    process.env.MONGODB_URL ?? DEFAULTS.MONGODB_URL, {},
    () => {
        logger.info('Connected to MongoDB')

        const PORT = process.env.PORT || DEFAULTS.PORT
        app.listen(PORT, () => {
            logger.info(`Listening to port ${PORT}`);
        });
    }
);
