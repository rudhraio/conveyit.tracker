import mongoose from 'mongoose';

const contactFormSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true,
    },
    ipAddress: {
        type: String,
        required: true,
    },
    submittedFromUrl: {
        type: String,
        required: true,
    },
    formData: {
        type: Object, // To store any JSON-like structure
        required: false, // Optional field
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    deviceDetails: {
        type: String,
        required: true
    }
});

export const ContactForm = mongoose.model('ContactForm', contactFormSchema);
