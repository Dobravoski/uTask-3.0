import { appDataSource } from "../../../database/data-source";

import { Task } from "../../../database/entities/Task";
import { User } from "../../../database/entities/User";

interface CreateTaskRequest {
    title: string
    description: string
    userId: string
}

export class CreateTaskService {
    async execute({title, description, userId}: CreateTaskRequest) {
        const taskRepository = appDataSource.getRepository(Task)
        const userRepository = appDataSource.getRepository(User)

        const user = await userRepository.findOne({where: {id: userId}})

        if(!user) {
            throw new Error("Usuário não encontrado")
        }

        const task = taskRepository.create({title, description, user})
        await taskRepository.save(task)
        return {
            id: task.id,
            title: task.title,
            description: task.description,
            status: task.status,
            createdAt: task.createdAt,
            updateAt: task.updateAt
        }
    }
}