import { FastifyInstance } from "fastify";

import { registerController } from "../controllers/register-controller";
import { loginController } from "../controllers/login-controller";
import { meController } from "../controllers/me-controller";

import { authMiddleware } from "../../../shared/middlewares/auth-middleware";

export async function authRoutes(app: FastifyInstance) {
    app.post("/register", registerController)
    app.post("/login", loginController)

    app.get("/me", {preHandler: authMiddleware}, meController)
}