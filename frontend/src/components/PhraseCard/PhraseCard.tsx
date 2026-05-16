import { useEffect, useState } from "react"

import "./PhraseCard.css"
import closeButton from "../../assets/close-button.svg"
import lightBulbIcon from "../../assets/light-bulb-kanban.svg"

interface PhraseCardProps {
  phrase: string
}

export default function PhraseCard({phrase}: PhraseCardProps) {
  const [isPhraseOpen, setIsPhraseOpen] = useState(false)

  useEffect(() => {
    function handleEscapeKey(event: KeyboardEvent) {
      if(event.key === "Escape") {
        setIsPhraseOpen(false)
      }
    }

    if(isPhraseOpen) {
      document.body.style.overflow = "hidden"
      window.addEventListener("keydown", handleEscapeKey)
    }

    return () => {
      document.body.style.overflow = "auto"
      window.removeEventListener("keydown", handleEscapeKey)
    }
  }, [isPhraseOpen])

  return (
    <>
      <button className="phrase-card" type="button" onClick={() => setIsPhraseOpen(true)}>
        <img className="phrase-icon" src={lightBulbIcon} alt="" />
        <span className="phrase-content">
          <strong>Frase do dia</strong>
          <span>{phrase}</span>
        </span>
      </button>

      {isPhraseOpen && (
        <div className="phrase-modal-overlay" onClick={() => setIsPhraseOpen(false)}>
          <section
            className="phrase-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="phrase-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <header className="phrase-modal-header">
              <img className="phrase-modal-icon" src={lightBulbIcon} alt="" />
              <h2 id="phrase-modal-title">Frase do dia</h2>
              <button className="phrase-modal-close-button" type="button" onClick={() => setIsPhraseOpen(false)} aria-label="Fechar frase do dia">
                <img src={closeButton} alt="" />
              </button>
            </header>

            <p>{phrase}</p>
          </section>
        </div>
      )}
    </>
  )
}
