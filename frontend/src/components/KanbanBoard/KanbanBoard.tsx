import { useState } from "react";
import { KanbanColumn } from "../KanbanColumn/KanbanColumn";

import type { Task, TaskStatus } from "../../types/task";

import "./KanbanBoard.css"
import closeButton from "../../assets/close-button.svg"
import navigateBefore from "../../assets/navigate-before.svg"
import navigateNext from "../../assets/navigate-next.svg"

interface KanbanBoardProps {
  todoTasks: Task[]
  doingTasks: Task[]
  doneTasks: Task[]
  onOpenModal: () => void
  onMoveTask: (taskId: string, direction: "forward" | "backward" | "reset") => void
  onDeleteTask: (taskId: string) => void
}

type KanbanColumnConfig = {
  status: TaskStatus
  title: string
  tasks: Task[]
}

export default function KanbanBoard({todoTasks, doingTasks, doneTasks, onOpenModal, onMoveTask, onDeleteTask}: KanbanBoardProps) {
  const [activeColumnIndex, setActiveColumnIndex] = useState(0)

  const columns: KanbanColumnConfig[] = [
    {status: "todo", title: "A fazer", tasks: todoTasks},
    {status: "doing", title: "Em andamento", tasks: doingTasks},
    {status: "done", title: "Feito", tasks: doneTasks},
  ]

  function showPreviousColumn() {
    setActiveColumnIndex((currentIndex) => currentIndex === 0 ? columns.length - 1 : currentIndex - 1)
  }

  function showNextColumn() {
    setActiveColumnIndex((currentIndex) => currentIndex === columns.length - 1 ? 0 : currentIndex + 1)
  }

  return (
    <div className="kanban-board-wrapper">
      <button
        className="kanban-navigation-button kanban-navigation-button-previous"
        type="button"
        onClick={showPreviousColumn}
        aria-label="Ver coluna anterior"
      >
        <img src={navigateBefore} alt=""/>
      </button>

      <section className="kanban-board" data-kanban-board>
        {columns.map((column, index) => (
          <KanbanColumn
            key={column.status}
            status={column.status}
            title={column.title}
            tasks={column.tasks}
            isActive={index === activeColumnIndex}
            headerAction={column.status === "todo" ? (
              <button className="add-task-button" type="button" onClick={onOpenModal} aria-label="Criar nova task">
                <img src={closeButton} alt=""/>
              </button>
            ) : undefined}
            onMoveTask={onMoveTask}
            onDeleteTask={onDeleteTask}
          />
        ))}
      </section>

      <button
        className="kanban-navigation-button kanban-navigation-button-next"
        type="button"
        onClick={showNextColumn}
        aria-label="Ver proxima coluna"
      >
        <img src={navigateNext} alt=""/>
      </button>

      <div className="kanban-pagination" aria-label="Colunas do Kanban">
        {columns.map((column, index) => (
          <button
            key={column.status}
            className={index === activeColumnIndex ? "kanban-pagination-dot kanban-pagination-dot-active" : "kanban-pagination-dot"}
            type="button"
            onClick={() => setActiveColumnIndex(index)}
            aria-label={`Ver coluna ${column.title}`}
            aria-current={index === activeColumnIndex ? "true" : undefined}
          />
        ))}
      </div>
    </div>
  )
}
