import "./FeedbackModal.css"

import successRegister from "../../assets/success-register.svg"
import errorRegister from "../../assets/error.svg"

type FeedbackModalProps = {
    title: string
    message: string
    type?: "success" | "error"
    onClose? : () => void
}

export function FeedbackModal({title, message, type="success", onClose}: FeedbackModalProps) {
    const icon = type === "success" ? successRegister : errorRegister

    return (
        <div className="feedback-modal-overlay">
            <div className="feedback-modal" role="dialog" aria-modal="true" aria-labelledby="feedback-modal-title">

                {onClose && (
                <button type="button" className="feedback-modal-close" onClick={onClose} aria-label="Fechar modal">
                    <img src={errorRegister} alt="" />
                </button>)}
                
                <div className={`feedback-modal-icon ${type}`}>
                    <img src={icon} alt="" />
                </div>

                <div className="feedback-modal-content">
                    <h2 id="feedback-modal-title">{title}</h2>
                    <p>{message}</p>
                </div>
            </div>
        </div>
    )
}
