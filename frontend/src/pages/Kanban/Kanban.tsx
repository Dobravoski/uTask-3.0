import { useState, useEffect } from "react";

import "./Kanban.css"
import Header from "../../components/KanbanHeader/KanbanHeader";
import Footer from "../../components/Footer/Footer";
import PhraseCard from "../../components/PhraseCard/PhraseCard";
import KanbanBoard from "../../components/KanbanBoard/KanbanBoard";
import TaskFormModal from "../../components/TaskFormModal/TaskFormModal";

import { phraseService } from "../../services/phraseService";
import { useTasks } from "../../hooks/useTasks";
import type { Task } from "../../types/task";

export default function Kanban() {
  useEffect(() => {document.title = "uTask 3.0 | Kanban"}, [])

  const [dailyPhrase, setDailyPhrase] = useState("Carregando frase do dia...")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)

  const {tasks, isLoading, createTask, moveTask, updateTask, deleteTask} = useTasks()

  const todoTasks = tasks.filter((task) => task.status === "todo")
  const doingTasks = tasks.filter((task) => task.status === "doing")
  const doneTasks = tasks.filter((task) => task.status === "done")

  async function loadedPhrase() {
    const loadedPhrase = await phraseService.getDailyPhrase()
    setDailyPhrase(loadedPhrase)
  }

  useEffect(() => {loadedPhrase()}, [])

  function openModal() {
    setEditingTask(null)
    setIsModalOpen(true)
  }

  function openEditModal(task: Task) {
    setEditingTask(task)
    setIsModalOpen(true)
  }

  function closeModal() {
    setIsModalOpen(false)
    setEditingTask(null)
  }

  async function handleSubmitTask(title: string, description: string) {
    if(editingTask) {
      await updateTask(editingTask.id, title, description)
      closeModal()
      return
    }

    await createTask(title, description)
    closeModal()
  }

  if(isLoading) {
    return <p>Carregando...</p>
  }

  return (
    <div className="kanban-page">
      <Header/>

      <main className="kanban-content"> 
        <PhraseCard phrase={dailyPhrase}/>

        <KanbanBoard
          todoTasks={todoTasks}
          doingTasks={doingTasks}
          doneTasks={doneTasks}
          onOpenModal={openModal}
          onMoveTask={moveTask}
          onEditTask={openEditModal}
          onDeleteTask={deleteTask}
        />
      </main>

      <Footer/>

      <TaskFormModal
        isOpen={isModalOpen}
        mode={editingTask ? "edit" : "create"}
        initialTitle={editingTask?.title}
        initialDescription={editingTask?.description}
        onClose={closeModal}
        onSubmit={handleSubmitTask}
      />

    </div>
  )
}
