import type { Task } from "../types/task";

const TASKS_STORAGE_KEY = "utask_tasks"

const mockTasks: Task[] = [
  {
    id: crypto.randomUUID(),
    title: "Criar tela de login",
    description: "Finalizar layout e validações da tela de login.",
    status: "done",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: crypto.randomUUID(),
    title: "Implementar Kanban",
    description: "Estruturar colunas e cards do board.",
    status: "doing",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: crypto.randomUUID(),
    title: "Adicionar dark mode",
    description: "",
    status: "todo",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]


export const taskService = {
    async getTasks(): Promise<Task[]> {
        const storedTasks = localStorage.getItem(TASKS_STORAGE_KEY)

        if(storedTasks) {
            return JSON.parse(storedTasks)
        }

        localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(mockTasks))

        return mockTasks
    },

    async saveTasks(tasks: Task[]): Promise<void> {
        localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks))
    }
}