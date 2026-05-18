import { appDataSource } from "../../../database/data-source";

import { Task } from "../../../database/entities/Task";

interface UpdateTaskRequest {
    taskId: string
    title: string
    description: string
    userId: string
}

export class UpdateTaskService {
    async execute({taskId, title, description, userId}: UpdateTaskRequest) {
        const taskRepository = appDataSource.getRepository(Task)
        const trimmedTitle = title.trim()

        if(!trimmedTitle) {
            throw new Error("Título obrigatório")
        }

        const task = await taskRepository.findOne({
            where: {id: taskId, user: {id: userId}},
            relations: ["user"]
        })

        if(!task) {
            throw new Error("Task não encontrada.")
        }

        task.title = trimmedTitle
        task.description = description.trim()

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
