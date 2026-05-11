import { createContext, useContext, useState, type ReactNode } from "react"
import * as authService from "../services/authService"

interface User {
    id: string,
    name: string,
    email: string
}

interface AuthContextData {
    user: User | null,
    token: string | null

    login: (email: string, password: string) => Promise<void>

    logout: () => void
}

interface AuthProviderProps {
    children: ReactNode
}

const USER_STORAGE_KEY = "@utask:user"
const TOKEN_STORAGE_KEY = "@utask:token"

const AuthContext = createContext<AuthContextData | undefined>(undefined)

function getStoredUser() {
    const storedUser = localStorage.getItem(USER_STORAGE_KEY)

    if(!storedUser) {
        return null
    }

    try {
        return JSON.parse(storedUser) as User
    } catch {
        localStorage.removeItem(USER_STORAGE_KEY)
        return null
    }
}

function getStoredToken() {
    const storedToken = localStorage.getItem(TOKEN_STORAGE_KEY)

    if(!storedToken) {
        return null
    }

    try {
        const parsedToken = JSON.parse(storedToken)

        if(typeof parsedToken === "string") {
            return parsedToken
        }
    } catch {
        return storedToken
    }

    return storedToken
}

export function AuthProvider({children}: AuthProviderProps) {

    const [user, setUser] = useState<User | null>(() => getStoredUser())
    const [token, setToken] = useState<string | null>(() => getStoredToken())

    async function login(email: string, password: string) {
        const response = await authService.login({email, password})

        setUser(response.user);
        setToken(response.token);

        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(response.user));
        localStorage.setItem(TOKEN_STORAGE_KEY, response.token);
    }

    function logout() {
        setUser(null);
        setToken(null);

        localStorage.removeItem(USER_STORAGE_KEY);
        localStorage.removeItem(TOKEN_STORAGE_KEY);
    }

    return (
        <AuthContext.Provider value={{user, token, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext);

    if(!context) {
        throw new Error("useAuth deve ser usado dentro de um AuthProvider");
    }

    return context;
}
