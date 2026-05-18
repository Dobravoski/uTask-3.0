import { FastifyReply, FastifyRequest } from "fastify";

import { DeleteTaskService } from "../services/delete-task-service";

export class DeleteTaskController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as {id: string};
    const userId = request.user.id;

    const deleteTaskService = new DeleteTaskService();

    await deleteTaskService.execute({taskId: id, userId})

    return reply.status(204).send();
  }
}