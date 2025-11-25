import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Navbar from "./components/NavBar";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import FavoritesPage from "./pages/Favorites";
import CityDetails from "./pages/CityDetails";
import AdminUsers from "./pages/AdminUsers";

export default function App() {
    const [accessToken, setAccessToken] = useState(Cookies.get("accessToken") || null);
    const [user, setUser] = useState(Cookies.get("user") ? JSON.parse(Cookies.get("user")!) : null);

    // Watch cookies to update login/logout state dynamically
    useEffect(() => {
        const interval = setInterval(() => {
            const token = Cookies.get("accessToken");
            setAccessToken(token || null);

            const usr = Cookies.get("user");
            setUser(usr ? JSON.parse(usr) : null);
        }, 200);

        return () => clearInterval(interval);
    }, []);

    return (
        <BrowserRouter>
            {/* Navbar visible only if logged in */}
            {accessToken && <Navbar />}

            <Routes>
                {/* PUBLIC ROUTES */}
                {!accessToken && (
                    <>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="*" element={<Navigate to="/login" replace />} />
                    </>
                )}

                {/* LOGGED-IN ROUTES */}
                {accessToken && (
                    <>
                        <Route path="/" element={<Home />} />
                        <Route path="/favorites" element={<FavoritesPage />} />
                        <Route path="/city/:name" element={<CityDetails />} />

                        {/* Admin-only routes */}
                        {user?.role === "admin" && (
                            <>
                                <Route path="/admin/users" element={<AdminUsers />} />
                            </>
                        )}

                        <Route path="*" element={<Navigate to="/" replace />} />
                    </>
                )}
            </Routes>
        </BrowserRouter>
    );
}
