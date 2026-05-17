import type { Task, TaskStatus } from "../types/task";

import { api } from "./api";

export const taskService = {
  async getTasks(): Promise<Task[]> {
    const response = await api.get("/tasks");
    return response.data;
  },

  async createTask(title: string, description: string): Promise<Task> {
    const response = await api.post("/tasks", {title, description});
    return response.data;
  },

  async updateTaskStatus(taskId: string, status: TaskStatus): Promise<Task> {
    const response = await api.patch(`/tasks/${taskId}/status`, {status});
    return response.data;
  },

  async deleteTask(taskId: string): Promise<void> {
    await api.delete(`/tasks/${taskId}`);
  },
};