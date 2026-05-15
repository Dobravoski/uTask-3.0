import { useEffect, useState } from "react"
import { taskService } from "../services/taskService"
import type { Task } from "../types/task"
import { getNextStatus, getPreviousStatus } from "../utils/taskStatus"

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
            const newTask: Task = {
                id: crypto.randomUUID(),
                title,
                description,
                status: "todo",
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            }

            const updatedTasks = [newTask, ...tasks];
            setTasks(updatedTasks);
            await taskService.saveTasks(updatedTasks)

        } catch (error) {
            console.error("Erro ao criar task:", error)
        }
    }

    async function moveTask(taskId: string, direction: "forward" | "backward" | "reset") {
        try {
            const updatedTasks = tasks.map((task) => {
                if (task.id !== taskId) {
                    return task
                }

                let newStatus = task.status

                if (direction === "forward") {
                    newStatus = getNextStatus(task.status) ?? task.status
                }

                if (direction === "backward") {
                    newStatus = getPreviousStatus(task.status) ?? task.status
                }

                if (direction === "reset") {
                    newStatus = "todo"
                }

                return {
                    ...task,
                    status: newStatus,
                    updatedAt: new Date().toISOString(),
                }
            })

            const sortedTasks = [...updatedTasks].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
            
            setTasks(sortedTasks)
            await taskService.saveTasks(sortedTasks)
        } catch (error) {
            console.error("Erro ao mover task:", error)
        }
    }

    async function deleteTask(taskId: string) {
        try {
            const updatedTasks = tasks.filter((task) => task.id !== taskId)
            setTasks(updatedTasks)
            await taskService.saveTasks(updatedTasks)
        } catch (error) {
            console.error("Erro ao deletar task:", error)
        }
    }

    return {
        tasks,
        isLoading,
        createTask,
        moveTask,
        deleteTask,
    }
}