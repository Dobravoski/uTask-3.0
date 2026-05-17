import { FastifyReply, FastifyRequest } from "fastify";

import { MeService } from "../services/me-service";

export async function meController(request: FastifyRequest, reply: FastifyReply) {
    try {
        const meService = new MeService()
        const result = await meService.execute(request.user.id)
        return reply.send(result)
    } catch (error) {
        return reply.status(404).send({message: error instanceof Error ? error.message : "Unexpected error"})
    }
}