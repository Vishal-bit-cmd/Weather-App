import { type JSX } from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

interface Props {
    children: JSX.Element;
    role?: "admin" | "user";
}

export default function ProtectedRoute({ children, role }: Props) {
    const token = Cookies.get("accessToken");
    const user = Cookies.get("user") ? JSON.parse(Cookies.get("user")!) : null;

    if (!token || !user) return <Navigate to="/login" replace />;

    if (role && user.role !== role) return <Navigate to="/" replace />;

    return children;
}
