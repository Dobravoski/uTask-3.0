import { useEffect, useState } from "react"
import { taskService } from "../services/taskService"
import type { Task, TaskStatus } from "../types/task"

export function useTasks() {
    const [tasks, setTasks] = useState<Task[]>([])
    const [isLoading, setIsLoading] = useState(true)

    async function loadTasks() {
        try {
            const loadedTasks = await taskService.getTasks()
            setTasks(loadedTasks)
        } catch (error) {
            console.error("Erro ao carregar tasks:", error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
    async function fetchTasks() {
        await loadTasks()
    }
    fetchTasks()
    }, [])

    async function createTask(title: string, description: string) {
        try {
            const newTask = await taskService.createTask(title, description)
            setTasks((currentTasks) => [newTask, ...currentTasks])
        } catch (error) {
            console.error("Erro ao criar task:", error)
        }
    }

    async function moveTask(taskId: string, newStatus: TaskStatus) {
        try {
            const updatedTask = await taskService.updateTaskStatus(taskId, newStatus)

            setTasks((currentTasks) => {
                const updatedTasks = currentTasks.map((task) => task.id === taskId ? updatedTask : task)

                return [...updatedTasks].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            })
        } catch (error) {
            console.error("Erro ao mover task:", error)
        }
    }

    async function updateTask(taskId: string, title: string, description: string) {
        try {
            const updatedTask = await taskService.updateTask(taskId, title, description)

            setTasks((currentTasks) => (
                currentTasks.map((task) => task.id === taskId ? updatedTask : task)
            ))
        } catch (error) {
            console.error("Erro ao atualizar task:", error)
        }
    }

    async function deleteTask(taskId: string) {
        try {
            await taskService.deleteTask(taskId)
            setTasks((currentTasks) => currentTasks.filter((task) => task.id !== taskId))
        } catch (error) {
            console.error("Erro ao deletar task:", error)
        }
    }

    return {
        tasks,
        isLoading,
        createTask,
        moveTask,
        updateTask,
        deleteTask,
    }
}
