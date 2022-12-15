import app from "./app";
import logger from "./core/configs/logger";

app.listen(process.env.PORT || 3000, () => {
    logger.info(`Listening to port ${process.env.PORT}`);
});
