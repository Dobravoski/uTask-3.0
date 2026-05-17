// The registration process should not automatically log the user in

import bcrypt from "bcrypt"

import { appDataSource } from "../../../database/data-source" 
import { User } from "../../../database/entities/User"

interface RegisterRequest {
    name: string,
    email: string,
    password: string
}

export class RegisterService {
    async execute({name, email, password}: RegisterRequest) {
        const userRepository = appDataSource.getRepository(User)
        const userAlredyExists = await userRepository.findOne({where: {email}})

        if(userAlredyExists) {
            throw new Error("Email alredy exists")
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = userRepository.create({name, email, password: hashedPassword})
        await userRepository.save(user)

        return {user: {id: user.id, name: user.name, email: user.email}}
    }
}