const xss = require('xss-clean');
import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from 'compression';
import path from 'path'
import morgan from './core/configs/morgan';
import mongoSanitize from 'express-mongo-sanitize';
import routes from "./routes";

dotenv.config();
const app = express();

app.use(morgan.successHandler);
app.use(morgan.errorHandler);
app.use(helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: false,
    crossOriginOpenerPolicy: false
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(xss());
app.use(mongoSanitize());
app.use(compression({ level: 6 }));
app.use(cors());
app.use(express.static(`public`));
app.use(express.static(`build/dist`));
app.use('/api', routes);
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'build/dist/index.html'));
});

export default app;
