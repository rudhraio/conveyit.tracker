import logger from "./src/utlis/helpers/logger.js";

import env from "./src/utlis/configs/env.js";
import { connectDB } from "./src/utlis/database/connectdb.js";
import app from "./src/app.js";

async function init() {
    const PORT = env.port || 3333;

    try {
        await connectDB();
        logger("DB Connection Successful");
        app.listen(PORT, () => {
            logger("Server Started");
            logger(`Listening on http://localhost:${PORT}`);
        });
    } catch (error) {
        logger("DB Connection Failed:", error);
        logger("Attempting to reconnect in 1 minute...");
        setTimeout(init, 60000);
    }
}

init();