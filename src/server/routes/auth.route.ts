import express from 'express';

const router = express.Router();

router.get('/login', (req,res) => {
    res.jsend.success('hi')
});

export default router;
