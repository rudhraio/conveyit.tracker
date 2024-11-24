import mongoose from 'mongoose';

const userActivitySchema = new mongoose.Schema({
    ipAddress: {
        type: String,
        required: true
    },
    deviceDetails: {
        type: String,
        required: true
    },
    visitedUrl: {
        type: String,
        required: true
    },
    headers: {
        type: Object,
        required: false,
    },
    additionalData: {
        type: Object,
        required: false,
    },
    createdAt: { type: Date, default: Date.now },

});

export const UserActivity = mongoose.model('UserActivity', userActivitySchema);
