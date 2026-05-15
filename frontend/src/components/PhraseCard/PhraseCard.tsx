import "./PhraseCard.css"
import lightBulbIcon from "../../assets/light-bulb-kanban.svg"

interface PhraseCardProps {
  phrase: string
}

export default function PhraseCard({phrase}: PhraseCardProps) {
  return (
    <section className="phrase-card">
      <img className="phrase-icon" src={lightBulbIcon} alt="" />
      <div className="phrase-content">
        <strong>Frase do dia</strong>
        <p>{phrase}</p>
      </div>
    </section>
  )
}
