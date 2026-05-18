import { TaskCard } from "../TaskCard/TaskCard";

import type { ReactNode } from "react";
import type { Task, TaskStatus } from "../../types/task";
import { useDroppable } from "@dnd-kit/core";

import "./KanbanColumn.css"

interface KanbanColumnProps {
    status: TaskStatus
    title: string
    tasks: Task[]
    headerAction?: ReactNode
    isActive?: boolean
    onMoveTask: (taskId: string, newStatus: TaskStatus) => void
    onDeleteTask: (taskId: string) => void
}

export function KanbanColumn({status, title, tasks, headerAction, isActive = true, onMoveTask, onDeleteTask}: KanbanColumnProps) {
    const { setNodeRef } = useDroppable({id: status})

    return (
        <section
            className={isActive ? "kanban-column kanban-column-active" : "kanban-column"}
            data-column-status={status}
        >
            <header className="kanban-column-header">
                <h2>{title}</h2>
                {headerAction}
            </header>

            <div className="kanban-column-tasks" data-droppable-id={status} ref={setNodeRef}>
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
