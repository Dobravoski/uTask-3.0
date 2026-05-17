import { FastifyInstance } from "fastify";

import { authMiddleware } from "../../../shared/middlewares/auth-middleware";

import { CreateTaskController } from "../controllers/create-task-controller";
import { GetTasksController } from "../controllers/get-tasks-controller";
import { UpdateTaskStatusController } from "../controllers/update-task-status-controller";
import { DeleteTaskController } from "../controllers/delete-task-controller";

export async function tasksRoutes(app: FastifyInstance) {
    app.post("/tasks", {preHandler: [authMiddleware]}, async (request, reply) => {return new CreateTaskController().handle(request, reply)})
    app.get("/tasks", {preHandler: [authMiddleware]}, async (request, reply) => {return new GetTasksController().handle(request, reply)})
    app.patch("/tasks/:id/status", {preHandler: [authMiddleware]}, async (request, reply) => {return new UpdateTaskStatusController().handle(request, reply)})
    app.delete("/tasks/:id", {preHandler: [authMiddleware]}, async (request, reply) => {return new DeleteTaskController().handle(request, reply)})
}