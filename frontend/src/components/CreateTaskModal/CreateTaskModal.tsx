import { useState, type FormEvent } from "react";

import "./CreateTaskModal.css"
import closeButton from "../../assets/close-button.svg"

interface CreateTaskModalProps {
    isOpen: boolean
    onClose: () => void
    onCreateTask: (title: string, description: string) => Promise<void>
}

export default function CreateTaskModal({isOpen, onClose, onCreateTask}: CreateTaskModalProps) {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    if(!isOpen) {
        return null
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        if(!title.trim()) {
            return
        }

        await onCreateTask(title.trim(), description.trim())

        setTitle("")
        setDescription("")
    }

    return (
        <div className="modal-overlay">
            <section className="create-task-modal" role="dialog" aria-modal="true" aria-labelledby="create-task-title">
                <header className="modal-header">
                    <h2 id="create-task-title">Nova Task</h2>
                    <button className="modal-close-button" type="button" onClick={onClose} aria-label="Fechar modal">
                        <img src={closeButton} alt="" />
                    </button>
                </header>

                <form className="modal-content" onSubmit={handleSubmit}>
                    <div className="modal-field">
                        <label htmlFor="title">Título *</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            maxLength={60}
                            placeholder="Digite o título da task"
                            onChange={(event) => setTitle(event.target.value)}
                        />
                    </div>

                    <div className="modal-field">
                        <label htmlFor="description">Descrição</label>
                        <textarea
                            id="description"
                            value={description}
                            maxLength={300}
                            placeholder="Descreva os detalhes da task"
                            onChange={(event) => setDescription(event.target.value)}
                        ></textarea>
                    </div>

                    <button className="create-task-button" type="submit">Criar task</button>
                </form>
            </section>
        </div>
    )
}
