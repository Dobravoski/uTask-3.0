import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register"
import Kanban from "../pages/Kanban"

import ProtectedRoute from "./ProtectedRoute"
import PublicRoute from "./PublicRoute";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/login" element={<PublicRoute> <Login/> </PublicRoute>} />
            <Route path="/register" element={<PublicRoute> <Register/> </PublicRoute>} />
            <Route path="/kanban" element={<ProtectedRoute> <Kanban/> </ProtectedRoute>}/>
        </Routes>
    )
}

export default AppRoutes