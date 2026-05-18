import { useEffect, useRef, useState } from "react";
import "./KanbanHeader.css";
import { useAuth } from "../../hooks/useAuth";
import { useTheme } from "../../hooks/useTheme";
import closeButton from "../../assets/close-button.svg"
import darkModeButton from "../../assets/dark-mode-button.svg"
import lightModeButton from "../../assets/light-mode-button.svg"
import moreOptionsIcon from "../../assets/more-options-kanban.svg"
import unectLogo from "../../assets/unect-logo.svg"

function Header() {
    const {theme, toggleTheme} = useTheme()
    const {logout} = useAuth()
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const menuRef = useRef<HTMLDivElement | null>(null)

    const themeButton = theme === "light" ? lightModeButton : darkModeButton
    const nextThemeLabel = theme === "light" ? "Ativar tema escuro" : "Ativar tema claro"

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if(menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false)
            }
        }

        function handleEscapeKey(event: KeyboardEvent) {
            if(event.key === "Escape") {
                setIsMenuOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        window.addEventListener("keydown", handleEscapeKey)

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
            window.removeEventListener("keydown", handleEscapeKey)
        }
    }, [])

    function handleLogout() {
        setIsMenuOpen(false)
        logout()
    }

    return (
        <header className="header">
            <div className="header-content">
                <img className="header-logo" src={unectLogo} alt="Unect logo" />
                <h1>uTask 3.0</h1>
                <div className="header-actions">
                    <button className="theme-toggle" type="button" aria-label={nextThemeLabel} onClick={toggleTheme}>
                        <img src={themeButton} alt="" />
                    </button>

                    <div className="header-options" ref={menuRef}>
                        <button
                            className="header-options-button"
                            type="button"
                            onClick={() => setIsMenuOpen((currentValue) => !currentValue)}
                            aria-label="Mais opcoes"
                            aria-expanded={isMenuOpen}
                        >
                            <img src={moreOptionsIcon} alt="" />
                        </button>

                        {isMenuOpen && (
                            <div className="header-options-menu">
                                <button className="header-logout-button" type="button" onClick={handleLogout}>
                                    <img src={closeButton} alt="" />
                                    Sair
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
