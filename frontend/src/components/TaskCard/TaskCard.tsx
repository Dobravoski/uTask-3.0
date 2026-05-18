import { useState, useEffect, useRef } from "react";
import type { Task, TaskStatus } from "../../types/task";
import { getNextStatus, getPreviousStatus } from "../../utils/taskStatus";

import { useDraggable } from "@dnd-kit/core";

import "./TaskCard.css"
import backwardButton from "../../assets/backward-button.svg"
import deleteIcon from "../../assets/delete-kanban.svg"
import editIcon from "../../assets/edit-kanban.svg"
import expandLessIcon from "../../assets/expand-less-kanban.svg"
import expandMoreIcon from "../../assets/expand-more-kanban.svg"
import forwardButton from "../../assets/forward-button.svg"
import moreOptionsIcon from "../../assets/more-options-kanban.svg"
import resetButton from "../../assets/reset-button.svg"

interface TaskCardProps {
    task: Task
    onMoveTask: (taskId: string, newStatus: TaskStatus) => void
    onEditTask: (task: Task) => void
    onDeleteTask: (taskId: string) => void
}

interface TaskCardPreviewProps {
    task: Task
}

export function TaskCardPreview({task}: TaskCardPreviewProps) {
    const canMoveForward = getNextStatus(task.status) !== null
    const canMoveBackward = getPreviousStatus(task.status) !== null
    const canReset = task.status === "done"

    return (
        <article
            className={task.status === "done" ? "task-card task-card-done task-card-overlay" : "task-card task-card-overlay"}
            data-task-status={task.status}
        >
            <div className="task-card-header">
                <h3>{task.title}</h3>

                <div className="task-menu">
                    <button className="task-menu-button" type="button" aria-label="Mais opções" tabIndex={-1}>
                        <img src={moreOptionsIcon} alt=""/>
                    </button>
                </div>
            </div>

            <div className="task-card-footer">
                <button className="task-description-button" type="button" tabIndex={-1}>
                    Ler descrição
                    <img src={expandMoreIcon} alt=""/>
                </button>

                <div className="task-card-actions">
                    {canMoveBackward && (
                        <button type="button" aria-label="Voltar task" tabIndex={-1}>
                            <img src={backwardButton} alt=""/>
                        </button>
                    )}
                    {canMoveForward && (
                        <button type="button" aria-label="Avançar task" tabIndex={-1}>
                            <img src={forwardButton} alt=""/>
                        </button>
                    )}
                    {canReset && (
                        <button type="button" aria-label="Reiniciar task" tabIndex={-1}>
                            <img src={resetButton} alt=""/>
                        </button>
                    )}
                </div>
            </div>
        </article>
    )
}

export function TaskCard({task, onMoveTask, onEditTask, onDeleteTask}: TaskCardProps) {
    const [isDescriptionOpen, setIsDescriptionOpen] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const menuRef = useRef<HTMLDivElement | null>(null)

    const { attributes, listeners, setNodeRef, isDragging} = useDraggable({id:task.id})

    const canMoveForward = getNextStatus(task.status) !== null
    const canMoveBackward = getPreviousStatus(task.status) !== null
    const canReset = task.status === "done"
    const nextStatus = getNextStatus(task.status)
    const previousStatus = getPreviousStatus(task.status)
    const description = task.description.trim() || "Sem descrição cadastrada."

    useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            setIsMenuOpen(false)
        }
    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => {document.removeEventListener("mousedown", handleClickOutside)}
}, [])

    function handleDeleteTask() {
        onDeleteTask(task.id)
        setIsMenuOpen(false)
    }

    function handleEditTask() {
        onEditTask(task)
        setIsMenuOpen(false)
    }

    return (
        <article
            ref={setNodeRef}
            {...attributes}
            className={[
                "task-card",
                task.status === "done" ? "task-card-done" : "",
                isDragging ? "task-card-dragging" : "",
            ].filter(Boolean).join(" ")}
            data-draggable-id={task.id}
            data-task-status={task.status}
        >
            <div className="task-card-header" {...listeners}>
                <h3>{task.title}</h3>

                <div className="task-menu" ref={menuRef} onPointerDown={(event) => event.stopPropagation()}>
                    <button
                        className="task-menu-button"
                        type="button"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Mais opções"
                        aria-expanded={isMenuOpen}
                    >
                        <img src={moreOptionsIcon} alt=""/>
                    </button>

                    {isMenuOpen && (
                        <div className="task-menu-options">
                            <button className="task-menu-option-button" type="button" onClick={handleEditTask}>
                                <img src={editIcon} alt=""/>
                                Editar
                            </button>
                            <button className="task-menu-option-button task-menu-delete-button" type="button" onClick={handleDeleteTask}>
                                <img src={deleteIcon} alt=""/>
                                Excluir
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className="task-card-footer">
                <button
                    className={isDescriptionOpen ? "task-description-button task-description-button-open" : "task-description-button"}
                    type="button"
                    onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}
                >
                    {isDescriptionOpen ? "Esconder descrição" : "Ler descrição"}
                    <img src={isDescriptionOpen ? expandLessIcon : expandMoreIcon} alt=""/>
                </button>

                <div className="task-card-actions">
                    {canMoveBackward && (
                        <button type="button" onClick={() => {if(previousStatus) onMoveTask(task.id, previousStatus)}} aria-label="Voltar task">
                            <img src={backwardButton} alt=""/>
                        </button>
                    )}
                    {canMoveForward && (
                        <button type="button" onClick={() => {if(nextStatus) onMoveTask(task.id, nextStatus)}} aria-label="Avançar task">
                            <img src={forwardButton} alt=""/>
                        </button>
                    )}
                    {canReset && (
                        <button type="button" onClick={() => onMoveTask(task.id, "todo")} aria-label="Reiniciar task">
                            <img src={resetButton} alt=""/>
                        </button>
                    )}
                </div>
            </div>

            {isDescriptionOpen && (
                <p className="task-description">{description}</p>
            )}
        </article>
    )
}
