import { FastifyReply, FastifyRequest } from "fastify";

import { GetTasksService } from "../services/get-tasks-service";

export class GetTasksController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const userId = request.user.id

        const getTasksService = new GetTasksService()
        const tasks = await getTasksService.execute({userId})

        return reply.send(tasks)
    }
}