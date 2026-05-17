import type { Task, TaskStatus } from "../types/task"
import { api } from "./api"

const TOKEN_STORAGE_KEY = "@utask:token"

function getAuthHeaders() {
    const token = localStorage.getItem(TOKEN_STORAGE_KEY)

    if(!token) {
        return {}
    }

    return {
        Authorization: `Bearer ${token}`
    }
}

export const taskService = {
    async getTasks(): Promise<Task[]> {
        const response = await api.get("/tasks", {
            headers: getAuthHeaders()
        })

        return response.data
    },

    async createTask(title: string, description: string): Promise<Task> {
        const response = await api.post("/tasks", {
            title,
            description
        }, {
            headers: getAuthHeaders()
        })

        return response.data
    },

    async updateTaskStatus(taskId: string, status: TaskStatus): Promise<Task> {
        const response = await api.patch(`/tasks/${taskId}/status`, {
            status
        }, {
            headers: getAuthHeaders()
        })

        return response.data
    }
}
