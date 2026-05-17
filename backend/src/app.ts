import Fastify from "fastify";
import cors from "@fastify/cors"

import { authRoutes } from "./modules/auth/routes/auth-routes";
import { tasksRoutes } from "./modules/tasks/routes/tasks-routes";

export const app = Fastify();

app.register(cors, {
    origin: true,
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
})

app.get("/", async () => {return {message: "uTask API running"}})

app.register(authRoutes, {prefix: "/auth"})
app.register(tasksRoutes)