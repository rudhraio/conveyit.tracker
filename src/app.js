import cors from "cors";
import express from "express";

import { badResponse, successResponse } from "./utlis/helpers/response.js";
import requestLog from "./utlis/middleware/request-log.js";
import router from "./routes/router.js";

const app = express();
app.use(express.json());

app.use(cors({
    origin: "*",
    credentials: true,
}));

// Health check route
app.get("/ping", (req, res) => {
    return successResponse(res, "ok");
});

app.use("/api", requestLog, router);


app.use("*", requestLog, (req, res) => {
    return badResponse(res, "invalid url")
})

export default app;