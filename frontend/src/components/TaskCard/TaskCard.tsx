import { useState, useEffect, useRef } from "react";
import type { Task } from "../../types/task";
import { getNextStatus, getPreviousStatus } from "../../utils/taskStatus";

import "./TaskCard.css"
import backwardButton from "../../assets/backward-button.svg"
import deleteIcon from "../../assets/delete-kanban.svg"
import expandLessIcon from "../../assets/expand-less-kanban.svg"
import expandMoreIcon from "../../assets/expand-more-kanban.svg"
import forwardButton from "../../assets/forward-button.svg"
import moreOptionsIcon from "../../assets/more-options-kanban.svg"
import resetButton from "../../assets/reset-button.svg"

interface TaskCardProps {
    task: Task
    onMoveTask: (taskId: string, direction: "forward" | "backward" | "reset") => void
    onDeleteTask: (taskId: string) => void
}

export function TaskCard({task, onMoveTask, onDeleteTask}: TaskCardProps) {
    const [isDescriptionOpen, setIsDescriptionOpen] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const menuRef = useRef<HTMLDivElement | null>(null)

    const canMoveForward = getNextStatus(task.status) !== null
    const canMoveBackward = getPreviousStatus(task.status) !== null
    const canReset = task.status === "done"
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

    return (
        <article
            className={task.status === "done" ? "task-card task-card-done" : "task-card"}
            data-draggable-id={task.id}
            data-task-status={task.status}
        >
            <div className="task-card-header">
                <h3>{task.title}</h3>

                <div className="task-menu" ref={menuRef}>
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
                        <button className="task-delete-button" type="button" onClick={handleDeleteTask}>
                            <img src={deleteIcon} alt=""/>
                            Excluir
                        </button>
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
                        <button type="button" onClick={() => onMoveTask(task.id, "backward")} aria-label="Voltar task">
                            <img src={backwardButton} alt=""/>
                        </button>
                    )}
                    {canMoveForward && (
                        <button type="button" onClick={() => onMoveTask(task.id, "forward")} aria-label="Avançar task">
                            <img src={forwardButton} alt=""/>
                        </button>
                    )}
                    {canReset && (
                        <button type="button" onClick={() => onMoveTask(task.id, "reset")} aria-label="Reiniciar task">
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
