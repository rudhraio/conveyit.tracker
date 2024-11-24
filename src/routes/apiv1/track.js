import express from 'express';
import crypto from 'crypto';


import { UserActivity } from '../../utlis/database/models/user-activity.js';
import { serverErrorResponse } from '../../utlis/helpers/response.js';

const trackRouter = express.Router();

const transparentPng = Buffer.from(
    '89504E470D0A1A0A0000000D4948445200000001000000010802000000907753DE0000000A49444154789C63604800000006000502A260E40000000049454E44AE426082',
    'hex'
);

trackRouter.get('/', async (req, res) => {
    const ipAddress = req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const userAgent = req.headers['user-agent'];
    const visitedUrl = req.query.url || 'Unknown URL';

    try {
        await UserActivity.create({
            ipAddress,
            deviceDetails: userAgent,
            visitedUrl,
        });

        // Generate random byte data to simulate a blank image
        const randomBytes = crypto.randomBytes(64); // Adjust the size as needed for the byte array

        res.setHeader('Content-Type', 'image/png');
        // res.end(randomBytes); // Send the random bytes as the response
        res.end(transparentPng); 
    } catch (error) {
        console.error('Error saving user activity:', error);
        serverErrorResponse(res)
    }
});

export default trackRouter;
