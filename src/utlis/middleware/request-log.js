import { json, query } from "express";
import { UserActivity } from "../database/models/user-activity.js";
import logger from "../helpers/logger.js";

async function requestLog(req, res, next) {
    const ipAddress = req.headers['true-client-ip'] || req.ip || req.connection.remoteAddress;
    const userAgent = req.headers['sec-ch-ua-platform'] || req.headers['user-agent'];
    const visitedUrl = req?.headers?.referer + (req?.query?.u || '') || 'Unknown URL';

    logger(`[Request] \n[IP]: ${req.ip} 
        \n[method]: ${req.method} 
        \n[headers]: ${JSON.stringify(req.headers)} 
        \n[data]: ${JSON.stringify(req?.body)} 
        \n[url]: ${req.url} 
        \n`);
    console.log({
                method: req.method,
                url: req.url,
                query: req.query,
                params: req.params,
                body: req.body,
                visitedUrl
            })
    try {
        await UserActivity.create({
            ipAddress: ipAddress,
            deviceDetails: userAgent,
            visitedUrl,
            headers: req.headers,
            additionalData: {
                method: req.method,
                url: req.url,
                query: req.query,
                params: req.params,
                body: req.body,
            },
        });
    } catch (error) {
        logger(`Error in user activity`)
    }
    return next();
}

export default requestLog;