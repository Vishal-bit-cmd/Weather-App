import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
    const { user, logout } = useContext(AuthContext);

    if (!user) return null;

    return (
        <nav className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-md">
            <Link to="/" className="font-bold text-xl">
                WeatherApp
            </Link>

            <div className="flex items-center space-x-6">
                {user.role !== "admin" && <Link to="/">Home</Link>}
                {user.role !== "admin" && <Link to="/favorites">Favorites</Link>}
                {user.role === "admin" && <Link to="/admin/users">Users</Link>}

                <span className="font-medium bg-white text-blue-600 px-3 py-1 rounded cursor-default">
                    {user.name} ({user.role})
                </span>

                <button
                    onClick={logout}
                    className="bg-red-500 px-4 py-1 rounded hover:bg-red-600"
                >
                    Logout
                </button>
            </div>
        </nav>
    );
}
