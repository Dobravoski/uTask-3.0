import "./Header.css";
import darkModeButton from "../../assets/dark-mode-button.svg"
import lightModeButton from "../../assets/light-mode-button.svg"
import { useTheme } from "../../hooks/useTheme";

function Header() {
    const {theme, toggleTheme} = useTheme()
    const themeButton = theme === "light" ? lightModeButton : darkModeButton
    const nextThemeLabel = theme === "light" ? "Ativar tema escuro" : "Ativar tema claro"

    return (
        <header className="login-register-header">
            <button className="login-register-theme-toggle" type="button" aria-label={nextThemeLabel} onClick={toggleTheme}>
                <img src={themeButton} alt="" />
            </button>
        </header>
    )
}

export default Header
