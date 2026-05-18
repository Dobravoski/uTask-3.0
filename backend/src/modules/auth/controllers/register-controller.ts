import { FastifyReply, FastifyRequest } from "fastify";

import { RegisterService } from "../services/register-service";

export async function registerController(request: FastifyRequest, reply: FastifyReply) {
    try {
        const {name, email, password} = request.body as {name: string, email: string, password: string}
        const registerService = new RegisterService()
        const result = await registerService.execute({name, email, password})

        return reply.status(201).send(result)
    } catch(error) {
        return reply.status(400).send({message: (error as Error).message})
    }
}