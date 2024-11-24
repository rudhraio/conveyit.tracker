import express from "express";
import trackRouter from "./apiv1/track.js";
import submitFormRouter from "./apiv1/submit-form.js";
import analyticsRouter from "./apiv1/analytics.js";



const router = express.Router();

router.use("/v1/blank.png", trackRouter);
router.use("/v1/form-submission", submitFormRouter);

export default router;