import { FastifyReply, FastifyRequest } from "fastify";

export async function meController(request: FastifyRequest, reply: FastifyReply) {
    return reply.send({userId: request.user.id})
}