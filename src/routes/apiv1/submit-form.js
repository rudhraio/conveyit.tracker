import express from 'express';


import { ContactForm } from '../../utlis/database/models/contact-form.js';
import { badResponse, serverErrorResponse, successResponse } from '../../utlis/helpers/response.js';
import logger from '../../utlis/helpers/logger.js';

const submitFormRouter = express.Router();

submitFormRouter.post('/', async (req, res) => {
    const formData = req.body;

    // Capture the referer URL (the URL from which the form was submitted)
    const submittedFromUrl = req.headers.referer || 'Unknown URL';
    const userAgent = req.headers['user-agent'];

    // Extract the IP address
    const ipAddress = req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    // Validate required fields (only 'message' is required)
    const requiredFields = ['message']; // 'message' is the only required field
    const missingFields = requiredFields.filter((field) => !formData[field]);

    
    if (missingFields.length > 0) {
        return badResponse(res, `Missing required field: ${missingFields.join(', ')}`)
    }
    console.log({ ...formData });
    try {
        // Save the form data along with IP address and URL to the database
        await ContactForm.create({
            formData: formData,
            message: formData["message"],
            ipAddress,
            submittedFromUrl,
            deviceDetails: userAgent,
        });

        return successResponse(res, "Form submitted successfully")
    } catch (error) {
        logger('Error saving contact form data:', error);
        return serverErrorResponse(res)
    }
});

export default submitFormRouter;
