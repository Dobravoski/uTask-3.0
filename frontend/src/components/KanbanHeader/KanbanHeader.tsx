import "./KanbanHeader.css";
import { useTheme } from "../../contexts/ThemeContext";
import darkModeButton from "../../assets/dark-mode-button.svg"
import lightModeButton from "../../assets/light-mode-button.svg"
import unectLogo from "../../assets/unect-logo.svg"

function Header() {
    const {theme, toggleTheme} = useTheme()
    const themeButton = theme === "light" ? lightModeButton : darkModeButton
    const nextThemeLabel = theme === "light" ? "Ativar tema escuro" : "Ativar tema claro"

    return (
        <header className="header">
            <div className="header-content">
                <img className="header-logo" src={unectLogo} alt="Unect logo" />
                <h1>uTask 3.0</h1>
                <button className="theme-toggle" type="button" aria-label={nextThemeLabel} onClick={toggleTheme}>
                    <img src={themeButton} alt="" />
                </button>
            </div>
        </header>
    )
}

export default Header
