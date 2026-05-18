import { FastifyReply, FastifyRequest } from "fastify";

import { UpdateTaskStatusService } from "../services/update-status-service";

export class UpdateTaskStatusController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        try {
            const { id } = request.params as {id: string}
            const { status } = request.body as {status: string}
            const userId = request.user.id
            const updateTaskStatusService = new UpdateTaskStatusService()

            const task = await updateTaskStatusService.execute({
                taskId: id,
                status,
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
