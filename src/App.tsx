import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";

import Navbar from "./components/NavBar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import FavoritesPage from "./pages/Favorites";
import CityDetails from "./pages/CityDetails";
import AdminUsers from "./pages/AdminHome";
import { AuthContext, AuthProvider } from "./context/AuthContext";

export default function App() {
    return (
        <AuthProvider>
            <RouterWithAuth />
        </AuthProvider>
    );
}

function RouterWithAuth() {
    const { user, loading } = useContext(AuthContext);

    if (loading) return <p className="p-6 text-center">Loading...</p>;

    return (
        <BrowserRouter>
            {user && <Navbar />}

            <Routes>

                {!user && (
                    <>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="*" element={<Navigate to="/login" replace />} />
                    </>
                )}

                {user && user.role !== "admin" && (
                    <>
                        <Route path="/" element={<Home />} />
                        <Route path="/favorites" element={<FavoritesPage />} />
                        <Route path="/city/:name" element={<CityDetails />} />
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </>
                )}

                {user && user.role === "admin" && (
                    <>
                        <Route path="/admin/users" element={<AdminUsers />} />
                        <Route path="*" element={<Navigate to="/admin/users" replace />} />
                    </>
                )}
            </Routes>
        </BrowserRouter>
    );
}
