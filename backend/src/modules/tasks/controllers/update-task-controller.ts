import { FastifyReply, FastifyRequest } from "fastify";

import { UpdateTaskService } from "../services/update-task-service";

export class UpdateTaskController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        try {
            const { id } = request.params as {id: string}
            const { title, description } = request.body as {title: string, description: string}
            const userId = request.user.id
            const updateTaskService = new UpdateTaskService()

            const task = await updateTaskService.execute({
                taskId: id,
                title,
                description,
                userId
            })

            return reply.send(task)
        } catch(error) {
            const message = error instanceof Error ? error.message : "Unexpected error"

            if(message === "Task não encontrada.") {
                return reply.status(404).send({message})
            }

            return reply.status(400).send({message})
        }
    }
}
