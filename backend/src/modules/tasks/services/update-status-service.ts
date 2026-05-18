import { appDataSource } from "../../../database/data-source";

import { Task } from "../../../database/entities/Task";

interface UpdateTaskStatusRequest {
    taskId: string,
    status: string,
    userId: string
}

export class UpdateTaskStatusService {
    async execute({taskId, status, userId}: UpdateTaskStatusRequest) {
        const taskRepository = appDataSource.getRepository(Task)
        const validStatus = ["todo", "doing", "done"]

        if(!validStatus.includes(status)) {
            throw new Error("Status inválido")
        }

        const task = await taskRepository.findOne({
            where: {id: taskId, user: {id: userId}},
            relations: ["user"]
        })

        if(!task) {
            throw new Error("Task não encontrada.")
        }

        task.status = status

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