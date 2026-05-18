import { FastifyReply, FastifyRequest } from "fastify";

import { LoginService } from "../services/login-service";

export async function loginController(request: FastifyRequest, reply: FastifyReply) {
    try {
        const {email, password} = request.body as {email: string, password: string}
        const loginService = new LoginService()
        const result = await loginService.execute({email, password})

        return reply.status(200).send(result)
    } catch(error) {
        return reply.status(400).send({message: (error as Error).message})
    }
}