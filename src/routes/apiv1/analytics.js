import express from 'express';
import { UserActivity } from '../../utlis/database/models/user-activity.js';


const analyticsRouter = express.Router();

// Route to render data
analyticsRouter.get('/', async (req, res) => {
    try {
        const data = await UserActivity.find().sort({ createdAt: -1 }); // Get data sorted by createdAt
        res.render('analytics', { data });
    } catch (err) {
        console.error(err);
        res.send('Error fetching data');
    }
});

export default analyticsRouter;