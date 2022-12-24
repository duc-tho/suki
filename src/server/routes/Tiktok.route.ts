import express from 'express';
import { TiktokController } from '../controllers/Tiktok.controller';

const router = express.Router();

router.get('/', TiktokController.get);

export default router;
