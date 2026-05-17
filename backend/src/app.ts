import Fastify from "fastify";
import cors from "@fastify/cors"

import { authRoutes } from "./modules/auth/routes/auth-routes";
import { tasksRoutes } from "./modules/tasks/routes/tasks-routes";

export const app = Fastify();

app.register(cors, {origin:true})

app.get("/", async () => {return {message: "uTask API running"}})

app.register(authRoutes, {prefix: "/auth"})
app.register(tasksRoutes)