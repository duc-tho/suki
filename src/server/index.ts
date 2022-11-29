import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from 'compression';
import path from 'path'

dotenv.config();

const PORT: number = parseInt((process.env.PORT ?? 8080) as string, 10);
const app = express();

app.use(helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: false,
    crossOriginOpenerPolicy: false
}));
app.use(compression({ level: 6 }));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(`public`));
app.use(express.static(`build/dist`));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'build/dist/index.html'));
});

const server = app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
