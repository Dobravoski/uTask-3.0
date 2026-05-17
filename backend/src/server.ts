import "reflect-metadata"

import { app } from "./app"
import { appDataSource } from "./database/data-source";

const PORT = 3333;

async function startServer() {
    try {
        await appDataSource.initialize();
        console.log("Database connected");
        await app.listen({port: PORT});
        console.log(`Server running on port ${PORT}`);
    } catch(error) {
        console.error(error);
        process.exit(1);
    }
}

startServer();