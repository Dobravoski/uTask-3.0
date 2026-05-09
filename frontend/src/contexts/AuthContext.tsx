import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { login as loginService } from "../services/authService"

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

const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({children}: AuthProviderProps) {

    const [user, setUser] = useState<User | null>(null)
    const [token, setToken] = useState<string | null>(null)

    async function login(email: string, password: string) {
        const response = await loginService({email, password})

        setUser(response.user);
        setToken(response.token);

        localStorage.setItem("@utask:user", JSON.stringify(response.user));
        localStorage.setItem("@utask:token", JSON.stringify(response.token));
    }

    function logout() {
        setUser(null);
        setToken(null);

        localStorage.removeItem("@utask:user");
        localStorage.removeItem("@utask:token");
    }

    useEffect(() => {
        const storedUser = localStorage.getItem("@utask:user");
        const storedToken = localStorage.getItem("@utask:token");

        if(storedUser && storedToken) {
            setUser(JSON.parse(storedUser));
            setToken(storedToken)
        }
    }, [])

    return (
        <AuthContext.Provider value={{user, token, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext);
}