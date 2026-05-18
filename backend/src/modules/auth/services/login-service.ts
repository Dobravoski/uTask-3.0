import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

import { appDataSource } from "../../../database/data-source"
import { User } from "../../../database/entities/User"

interface LoginRequest {
    email: string
    password: string
}

export class LoginService {
    async execute({email, password}: LoginRequest) {
        const userRepository = appDataSource.getRepository(User)
        const user = await userRepository.findOne({where: {email}})
        
        if(!user) {
            throw new Error("Invalid credentials")
        }

        const passwordMatch = await bcrypt.compare(password, user.password)

        if(!passwordMatch) {
            throw new Error("Invalid credentials")
        }

        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET as string, {expiresIn: "7d"})

        return {
            user: {id: user.id, name: user.name, email: user.email},
            token
        }
    }
}