import { useLayoutEffect, useState, type ReactNode } from "react";

import { ThemeContext, type Theme } from "../contexts/themeContext";

const THEME_STORAGE_KEY = "@utask-theme";

function getStoredTheme(): Theme {
    if (typeof window === "undefined") {
        return "light";
    }

    const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    return storedTheme === "dark" ? "dark" : "light";
}

export function ThemeProvider({children}: {children: ReactNode}) {
    const [theme, setTheme] = useState<Theme>(getStoredTheme);

    useLayoutEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    }, [theme]);

    function toggleTheme() {
        setTheme((currentTheme) => currentTheme === "light" ? "dark" : "light");
    }

    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    );
}
