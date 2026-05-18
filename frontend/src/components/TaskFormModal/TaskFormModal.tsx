import { useEffect, useState, type FormEvent } from "react";

import "./TaskFormModal.css"
import closeButton from "../../assets/close-button.svg"

interface TaskFormModalProps {
    isOpen: boolean
    mode: "create" | "edit"
    initialTitle?: string
    initialDescription?: string
    onClose: () => void
    onSubmit: (title: string, description: string) => Promise<void>
}

interface TaskFormContentProps {
    mode: "create" | "edit"
    initialTitle: string
    initialDescription: string
    onClose: () => void
    onSubmit: (title: string, description: string) => Promise<void>
}

function TaskFormContent({mode, initialTitle, initialDescription, onClose, onSubmit}: TaskFormContentProps) {
    const [title, setTitle] = useState(initialTitle)
    const [description, setDescription] = useState(initialDescription)

    const modalTitle = mode === "edit" ? "Editar Task" : "Nova Task"
    const submitLabel = mode === "edit" ? "Salvar alterações" : "Criar task"

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        if(!title.trim()) {
            return
        }

        await onSubmit(title.trim(), description.trim())

        setTitle("")
        setDescription("")
    }

    return (
        <div className="modal-overlay" onClick={onClose}>
            <section className="task-form-modal" role="dialog" aria-modal="true" aria-labelledby="task-form-title" onClick={(event) => event.stopPropagation()}>
                <header className="modal-header">
                    <h2 id="task-form-title">{modalTitle}</h2>
                    <button className="modal-close-button" type="button" onClick={onClose} aria-label="Fechar modal">
                        <img src={closeButton} alt="" />
                    </button>
                </header>

                <form className="modal-content" onSubmit={handleSubmit}>
                    <div className="modal-field">
                        <label htmlFor="task-title">Título *</label>
                        <input
                            type="text"
                            id="task-title"
                            value={title}
                            maxLength={60}
                            placeholder="Digite o título da task"
                            onChange={(event) => setTitle(event.target.value)}
                        />
                    </div>

                    <div className="modal-field">
                        <label htmlFor="task-description">Descrição</label>
                        <textarea
                            id="task-description"
                            value={description}
                            maxLength={300}
                            placeholder="Descreva os detalhes da task"
                            onChange={(event) => setDescription(event.target.value)}
                        ></textarea>
                    </div>

                    <button className="task-form-submit-button" type="submit">{submitLabel}</button>
                </form>
            </section>
        </div>
    )
}

export default function TaskFormModal({
    isOpen,
    mode,
    initialTitle = "",
    initialDescription = "",
    onClose,
    onSubmit
}: TaskFormModalProps) {
    useEffect(() => {
        function handleEscapeKey(event: KeyboardEvent) {
            if(event.key === "Escape") {
                onClose()
            }
        }

        if(isOpen) {
            document.body.style.overflow = "hidden"
            window.addEventListener("keydown", handleEscapeKey)
        }

        return () => {
            document.body.style.overflow = "auto"
            window.removeEventListener("keydown", handleEscapeKey)
        }
    }, [isOpen, onClose])

    if(!isOpen) {
        return null
    }

    return (
        <TaskFormContent
            key={`${mode}-${initialTitle}-${initialDescription}`}
            mode={mode}
            initialTitle={initialTitle}
            initialDescription={initialDescription}
            onClose={onClose}
            onSubmit={onSubmit}
        />
    )
}
