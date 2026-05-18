import { useCallback, useEffect, useState, type ReactNode } from "react"

import * as authService from "../services/authService"
import { AuthContext, type User } from "../contexts/authContext"

import { api } from "../services/api"

interface AuthProviderProps {
    children: ReactNode
}

const USER_STORAGE_KEY = "@utask:user"
const TOKEN_STORAGE_KEY = "@utask:token"

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
    const [loading, setLoading] = useState(() => Boolean(getStoredToken()))

    const login = useCallback(async (email: string, password: string) => {
        const response = await authService.login({email, password})

        setUser(response.user);
        setToken(response.token);

        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(response.user));
        localStorage.setItem(TOKEN_STORAGE_KEY, response.token);
    }, [])

    const logout = useCallback(() => {
        setUser(null);
        setToken(null);
        setLoading(false);

        localStorage.removeItem(USER_STORAGE_KEY);
        localStorage.removeItem(TOKEN_STORAGE_KEY);
    }, [])

    useEffect(() => {
        if(!token) {
            return
        }

        let isMounted = true

        async function loadUser() {
            try {
                await api.get("/auth/me", {headers: {Authorization: `Bearer ${token}`}})
            } catch {
                if(isMounted) {
                    logout()
                }
            } finally {
                if(isMounted) {
                    setLoading(false)
                }
            }
        }

        loadUser()

        return () => {
            isMounted = false
        }
    }, [logout, token])

    return (
        <AuthContext.Provider value={{user, token, loading, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}
