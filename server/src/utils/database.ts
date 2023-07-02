import mongoose from "mongoose";
import logger from "./logger";

const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING || "mongodb://localhost:27017/unilearning";

export async function connectToDatabase() {
    try {
        await mongoose.connect(DB_CONNECTION_STRING, {
            family: 4   // Use IPv4, skip trying IPv6
        });
        logger.info("Connected to database");
    } catch (error: any) {
        logger.error(`Error connecting to database: ${error.message}`);

        process.exit(1);
    }
}

export async function closeDatabaseConnection() {
    await mongoose.connection.close();
    logger.info("Closed database connection");
    return;
}