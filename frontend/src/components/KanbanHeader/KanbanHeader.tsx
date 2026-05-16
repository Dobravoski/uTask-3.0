import "./KanbanHeader.css";
import lightModeButton from "../../assets/light-mode-button.svg"
import unectLogo from "../../assets/unect-logo.svg"

function Header() {
    return (
        <header className="header">
            <div className="header-content">
                <img className="header-logo" src={unectLogo} alt="Unect" />
                <h1>uTask 3.0</h1>
                <button className="theme-toggle" type="button" aria-label="Alternar tema">
                    <img src={lightModeButton} alt="" />
                </button>
            </div>
        </header>
    )
}

export default Header
