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
            const newTask = await taskService.createTask(title, description)
            setTasks((currentTasks) => [newTask, ...currentTasks])
        } catch (error) {
            console.error("Erro ao criar task:", error)
        }
    }

    async function moveTask(taskId: string, direction: "forward" | "backward" | "reset") {
        try {
            const taskToUpdate = tasks.find((task) => task.id === taskId)

            if(!taskToUpdate) {
                return
            }

            let newStatus = taskToUpdate.status

            if (direction === "forward") {
                newStatus = getNextStatus(taskToUpdate.status) ?? taskToUpdate.status
            }

            if (direction === "backward") {
                newStatus = getPreviousStatus(taskToUpdate.status) ?? taskToUpdate.status
            }

            if (direction === "reset") {
                newStatus = "todo"
            }

            const updatedTask = await taskService.updateTaskStatus(taskId, newStatus)
            const updatedTasks = tasks.map((task) => task.id === taskId ? updatedTask : task)
            const sortedTasks = [...updatedTasks].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            
            setTasks(sortedTasks)
        } catch (error) {
            console.error("Erro ao mover task:", error)
        }
    }

    async function deleteTask(taskId: string) {
        try {
            await taskService.deleteTask(taskId)
            const updatedTasks = tasks.filter((task) => task.id !== taskId)
            setTasks(updatedTasks)
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
