import cors from "cors";
import express from "express";
import path from "path";

import { fileURLToPath } from 'url';

import { badResponse, successResponse } from "./utlis/helpers/response.js";
import requestLog from "./utlis/middleware/request-log.js";
import router from "./routes/router.js";
import analyticsRouter from "./routes/apiv1/analytics.js";

const app = express();
app.use(express.json());

app.use(cors({
    origin: "*",
    credentials: true,
}));

// Get the current file's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set 'views' directory for any views 
app.set('views', path.join(__dirname, 'views'));

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Health check route
app.get("/ping", (req, res) => {
    return successResponse(res, "ok");
});

app.use("/api", requestLog, router);
app.use("/views/analytics", analyticsRouter)


app.use("*", (req, res) => {
    return badResponse(res, "invalid url")
})

export default app;