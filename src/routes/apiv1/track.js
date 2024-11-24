import express from 'express';

import { serverErrorResponse } from '../../utlis/helpers/response.js';

const trackRouter = express.Router();

const transparentPng = Buffer.from(
    '89504E470D0A1A0A0000000D4948445200000001000000010802000000907753DE0000000A49444154789C63604800000006000502A260E40000000049454E44AE426082',
    'hex'
);

trackRouter.get('/', async (req, res) => {
    try {
        res.setHeader('Content-Type', 'image/png');
        res.end(transparentPng);
    } catch (error) {
        console.error('Error saving user activity:', error);
        serverErrorResponse(res)
    }
});

export default trackRouter;
