import { Navigate, Routes, Route } from "react-router-dom";

import Login from "../pages/Login/login";
import Register from "../pages/Register/register";
import Kanban from "../pages/Kanban";

import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
            <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
            <Route path="/" element={<ProtectedRoute><Kanban /></ProtectedRoute>} />
            <Route path="/kanban" element={<ProtectedRoute><Kanban /></ProtectedRoute>} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    )
}

export default AppRoutes
