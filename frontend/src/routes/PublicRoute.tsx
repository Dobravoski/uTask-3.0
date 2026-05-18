import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import type { ReactNode } from "react";

interface PublicRouteProps {
    children: ReactNode
}

export default function PublicRoute({children}: PublicRouteProps) {
    const {token} = useAuth();

    if(token) {
        return <Navigate to="/" replace />
    }

    return children
}
