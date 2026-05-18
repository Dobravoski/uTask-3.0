import { useState } from "react";
import { KanbanColumn } from "../KanbanColumn/KanbanColumn";
import { TaskCardPreview } from "../TaskCard/TaskCard";

import type { Task, TaskStatus } from "../../types/task";

import { DndContext, DragOverlay, type DragEndEvent, type DragStartEvent } from "@dnd-kit/core";

import "./KanbanBoard.css"
import closeButton from "../../assets/close-button.svg"
import navigateBefore from "../../assets/navigate-before.svg"
import navigateNext from "../../assets/navigate-next.svg"

interface KanbanBoardProps {
  todoTasks: Task[]
  doingTasks: Task[]
  doneTasks: Task[]
  onOpenModal: () => void
  onMoveTask: (taskId: string, newStatus: TaskStatus) => void
  onDeleteTask: (taskId: string) => void
}

type KanbanColumnConfig = {
  status: TaskStatus
  title: string
  tasks: Task[]
}

export default function KanbanBoard({todoTasks, doingTasks, doneTasks, onOpenModal, onMoveTask, onDeleteTask}: KanbanBoardProps) {
  const [activeColumnIndex, setActiveColumnIndex] = useState(0)
  const [activeId, setActiveId] = useState<string | null>(null)

  const columns: KanbanColumnConfig[] = [
    {status: "todo", title: "A fazer", tasks: todoTasks},
    {status: "doing", title: "Em andamento", tasks: doingTasks},
    {status: "done", title: "Feito", tasks: doneTasks},
  ]

  const activeTask = [...todoTasks, ...doingTasks, ...doneTasks].find(task => task.id === activeId)

  const isFirstColumnActive = activeColumnIndex === 0
  const isLastColumnActive = activeColumnIndex === columns.length - 1

  function showPreviousColumn() {
    setActiveColumnIndex((currentIndex) => Math.max(0, currentIndex - 1))
  }

  function showNextColumn() {
    setActiveColumnIndex((currentIndex) => Math.min(columns.length - 1, currentIndex + 1))
  }

  function handleDragStart(event: DragStartEvent) {
    setActiveId(String(event.active.id))
  }

  function handleDragEnd(event: DragEndEvent) {
    const {active, over} = event

    setActiveId(null)

    if(!over) {
      return
    }

    const taskId = active.id as string
    const newStatus = over.id as TaskStatus
    onMoveTask(taskId, newStatus)
  }

  return (
    <div className="kanban-board-wrapper">
      <button
        className="kanban-navigation-button kanban-navigation-button-previous"
        type="button"
        onClick={showPreviousColumn}
        disabled={isFirstColumnActive}
        aria-label="Ver coluna anterior"
      >
        <img src={navigateBefore} alt=""/>
      </button>

      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
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

        <DragOverlay dropAnimation={null}>
          {activeTask ? <TaskCardPreview task={activeTask} /> : null}
        </DragOverlay>
      </DndContext>

      <button
        className="kanban-navigation-button kanban-navigation-button-next"
        type="button"
        onClick={showNextColumn}
        disabled={isLastColumnActive}
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
