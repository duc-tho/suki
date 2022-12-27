import app from "./app";
import logger from "./core/configs/Logger";
import mongoose, { connect } from 'mongoose';
import { DEFAULTS } from "./core/constants/Defaults";

mongoose.set('strictQuery', false);
connect(
    process.env.MONGODB_URL ?? DEFAULTS.MONGODB_URL, {},
    () => {
        const PORT = process.env.PORT || DEFAULTS.PORT
        app.listen(PORT, () => {
            logger.info(`Listening to port ${PORT}`);
        });
    }
);
