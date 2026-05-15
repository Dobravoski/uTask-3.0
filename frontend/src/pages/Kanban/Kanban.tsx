import { useState, useEffect } from "react";

import "./Kanban.css"
import Header from "../../components/KanbanHeader";
import Footer from "../../components/Footer/Footer";
import PhraseCard from "../../components/PhraseCard/PhraseCard";
import KanbanBoard from "../../components/KanbanBoard/KanbanBoard";
import CreateTaskModal from "../../components/CreateTaskModal/CreateTaskModal";

import { phraseService } from "../../services/phraseService";
import { useTasks } from "../../hooks/useTasks";

export default function Kanban() {
  useEffect(() => {document.title = "uTask 3.0 | Kanban"}, [])

  const [dailyPhrase, setDailyPhrase] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)

  const {tasks, isLoading, createTask, moveTask, deleteTask} = useTasks()

  const todoTasks = tasks.filter((task) => task.status === "todo")
  const doingTasks = tasks.filter((task) => task.status === "doing")
  const doneTasks = tasks.filter((task) => task.status === "done")

  async function loadedPhrase() {
    const loadedPhrase = await phraseService.getDailyPhrase()
    setDailyPhrase(loadedPhrase)
  }

  useEffect(() => {loadedPhrase()})

  function openModal() {
    setIsModalOpen(true)
  }
  function closeModal() {
    setIsModalOpen(false)
  }

  async function handleCreateTask(title: string, description: string) {
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
          onDeleteTask={deleteTask}
        />
      </main>

      <Footer/>

      <CreateTaskModal isOpen={isModalOpen} onClose={closeModal} onCreateTask={handleCreateTask}/>

    </div>
  )
}
