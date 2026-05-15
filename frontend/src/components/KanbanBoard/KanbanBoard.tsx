import { KanbanColumn } from "../KanbanColumn/KanbanColumn";

import type { Task, TaskStatus } from "../../types/task";

import "./KanbanBoard.css"
import closeButton from "../../assets/close-button.svg"

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
  const columns: KanbanColumnConfig[] = [
    {status: "todo", title: "A fazer", tasks: todoTasks},
    {status: "doing", title: "Em andamento", tasks: doingTasks},
    {status: "done", title: "Feito", tasks: doneTasks},
  ]

  return (
    <section className="kanban-board" data-kanban-board>
      {columns.map((column) => (
        <KanbanColumn
          key={column.status}
          status={column.status}
          title={column.title}
          tasks={column.tasks}
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
  )
}
