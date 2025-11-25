import type { JSX } from "react";
import { Navigate } from "react-router-dom";

interface Props {
    children: JSX.Element;
    role?: "admin" | "user";
}

export default function ProtectedRoute({ children, role }: Props) {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user")!)
        : null;

    if (!token) return <Navigate to="/login" />;

    if (role && user.role !== role) return <Navigate to="/" />;

    return children;
}
