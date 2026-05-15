import { TaskCard } from "../TaskCard/TaskCard";

import type { Task, TaskStatus } from "../../types/task";

import "./KanbanColumn.css"

interface KanbanColumnProps {
    status: TaskStatus
    title: string
    tasks: Task[]
    onMoveTask: (taskId: string, direction: "forward" | "backward" | "reset") => void
    onDeleteTask: (taskId: string) => void
}

export function KanbanColumn({status, title, tasks, onMoveTask, onDeleteTask}: KanbanColumnProps) {
    return (
        <section className="kanban-column" data-column-status={status}>
            <header className="kanban-column-header">
                <h2>{title}</h2>
            </header>

            <div className="kanban-column-tasks" data-droppable-id={status}>
                {tasks.map((task) => (
                    <TaskCard
                        key={task.id}
                        task={task}
                        onMoveTask={onMoveTask}
                        onDeleteTask={onDeleteTask}
                    />
                ))}
            </div>
        </section>
    )
}
