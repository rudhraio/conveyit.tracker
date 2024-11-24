import mongoose from 'mongoose';

import env from '../configs/env.js';

let globalForMongoose = global;

export const mongooseClient = globalForMongoose.mongooseClient || mongoose;

if (process.env.NODE_ENV !== 'production') globalForMongoose.mongooseClient = mongooseClient;

export function connectDB() {
    return new Promise(async (resolve, reject) => {
        try {
            const mongoURI = env.database.url; // Replace with your MongoDB URI
            mongooseClient.set('strictQuery', false); // Optional: Configure Mongoose behavior
            await mongooseClient.connect(mongoURI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            console.log('MongoDB connected successfully');
            resolve();
        } catch (error) {
            console.error('Error connecting to MongoDB:', error);
            reject(error);
        }
    });
}
