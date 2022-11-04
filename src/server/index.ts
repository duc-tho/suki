import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from 'compression';

dotenv.config();

const PORT: number = parseInt((process.env.PORT ?? 8080) as string, 10);
const app = express();

app.use(compression({ level: 6 }));
app.use(express.static('build/dist'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('*', (req, res) => res.send('Hello'));

const server = app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
