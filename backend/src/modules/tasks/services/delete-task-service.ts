import { appDataSource } from "../../../database/data-source";

import { Task } from "../../../database/entities/Task";

interface DeleteTaskRequest {
    taskId: string,
    userId: string
}

export class DeleteTaskService{
    async execute({taskId, userId}: DeleteTaskRequest) {
        const taskRepository = appDataSource.getRepository(Task)
        
        const task = await taskRepository.findOne({
            where: {id: taskId, user: {id: userId}},
            relations: ["user"]
        })

        if(!task) {
            throw new Error("Task não encontrada")
        }
        
        await taskRepository.remove(task)
    }
}