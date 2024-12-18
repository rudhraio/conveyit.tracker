import express from 'express';
import { UserActivity } from '../../utlis/database/models/user-activity.js';


const analyticsRouter = express.Router();

// Route to render data
analyticsRouter.get('/', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // Default to page 1
        const limit = parseInt(req.query.limit) || 100;

        const skip = (page - 1) * limit;

        // Fetch data with pagination
        const data = await UserActivity.find()
            .sort({ createdAt: -1 }) // Sort by newest first
            .skip(skip)
            .limit(limit);

        // Total record count for pagination
        const totalRecords = await UserActivity.countDocuments();

        // Total pages
        const totalPages = Math.ceil(totalRecords / limit);

        // Render with data and pagination info
        res.render('analytics', {
            data,
            currentPage: page,
            totalPages,
            totalRecords,
            limit,
        });
    } catch (err) {
        console.error(err);
        res.send('Error fetching data');
    }
});

export default analyticsRouter;