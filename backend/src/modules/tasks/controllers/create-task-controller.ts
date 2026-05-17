import { FastifyReply, FastifyRequest } from "fastify";

import { CreateTaskService } from "../services/create-task-service";

export class CreateTaskController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { title, description } = request.body as {title: string, description: string}
        const userId = request.user.id

        const createTaskService = new CreateTaskService()
        const task = await createTaskService.execute({title, description, userId})

        return reply.status(201).send(task)
    }
}