import { FastifyInstance } from "fastify";

import { registerController } from "../controllers/register-controller";
import { loginController } from "../controllers/login-controller";

export async function authRoutes(app: FastifyInstance) {
    app.post("/register", registerController)
    app.post("/login", loginController)
}