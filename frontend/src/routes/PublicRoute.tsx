import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import type { ReactNode } from "react";

interface PublicRouteProps {
    children: ReactNode
}

export default function PublicRoute({children}: PublicRouteProps) {
    const {loading, token} = useAuth();

    if(loading) {
        return null
    }

    if(token) {
        return <Navigate to="/" replace />
    }

    return children
}
