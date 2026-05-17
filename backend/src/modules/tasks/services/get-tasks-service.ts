import { appDataSource } from "../../../database/data-source";

import { Task } from "../../../database/entities/Task";

interface GetTasksRequest {
    userId: string
}

export class GetTasksService {
    async execute({userId}: GetTasksRequest) {
        const taskRepository = appDataSource.getRepository(Task)

        const tasks = await taskRepository.find({
            where: {user: {id: userId}},
            order: {createdAt: "DESC"}
        })

        return tasks.map((task) => ({
            id: task.id,
            title: task.title,
            description: task.description,
            status: task.status,
            createdAt: task.createdAt
        }))
    }
}
