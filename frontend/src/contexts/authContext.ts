import { createContext } from "react"

export interface User {
    id: string,
    name: string,
    email: string
}

export interface AuthContextData {
    user: User | null,
    token: string | null,

    login: (email: string, password: string) => Promise<void>,

    logout: () => void
}

export const AuthContext = createContext<AuthContextData | undefined>(undefined)
