import { FastifyReply, FastifyRequest } from "fastify";
import jwt from "jsonwebtoken"

interface TokenPayload {
    id: string
}

export async function authMiddleware(request: FastifyRequest, reply: FastifyReply) {
    try {
        const authHeader = request.headers.authorization;

        if(!authHeader) {
            return reply.status(401).send({message: "Unauthorized"})
        }

        const [, token] = authHeader.split(" ")

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string)

        const { id } = decoded as TokenPayload

        request.user = {id}
    } catch(error) {
        return reply.status(401).send({message: "Unauthorized"})
    }
}