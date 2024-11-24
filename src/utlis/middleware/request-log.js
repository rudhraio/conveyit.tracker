import { UserActivity } from "../database/models/user-activity.js";
import logger from "../helpers/logger.js";

async function requestLog(req, res, next) {
    const ipAddress = req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const userAgent = req.headers['user-agent'];
    const visitedUrl = req.query.url || 'Unknown URL';

    logger(`[Request] \n[IP]: ${req.ip} \n[method]: ${req.method} \n[headers]: ${JSON.stringify(req.headers)} \n[data]: ${JSON.stringify(req?.body)} \n[url]: ${req.url} \n`);
    try {
        await UserActivity.create({
            ipAddress: ipAddress,
            deviceDetails: userAgent,
            visitedUrl,
            headers: req.headers,
            additionalData: {
                method: req.method,
                body: req.body,
                url: req.url
            }
        });
    } catch (error) {
        console.log("Error", error);
        logger(`Error in user activity`)
    }
    return next();
}

export default requestLog;