import type { ReactNode } from "react"
import { Navigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

interface ProtectedRouteProps {
    children: ReactNode
}

export default function ProtectedRoute({children}: ProtectedRouteProps) {
    const {loading, token} = useAuth()

    if(loading) {
        return null
    }

    if(!token) {
        return <Navigate to="/login" replace />
    }

    return children
}
