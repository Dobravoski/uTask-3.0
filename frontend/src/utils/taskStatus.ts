import type { TaskStatus } from "../types/task";

export function getNextStatus(status: TaskStatus): TaskStatus | null {
    if(status === "todo") {
        return "doing"
    }

    if(status === "doing") {
        return "done"
    }

    return null
}

export function getPreviousStatus(status: TaskStatus): TaskStatus | null {
    if(status === "done") {
        return "doing"
    }

    if(status === "doing") {
        return "todo"
    }

    return null
}