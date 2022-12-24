import express from 'express';
import tiktokRoute from './Tiktok.route';

const router = express.Router();

router.use('/tiktok', tiktokRoute);

export default router;
