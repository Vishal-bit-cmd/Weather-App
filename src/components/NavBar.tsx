import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function NavBar() {
    const navigate = useNavigate();
    const user = Cookies.get("user") ? JSON.parse(Cookies.get("user")!) : null;

    const logout = () => {
        Cookies.remove("accessToken");
        Cookies.remove("user");
        navigate("/login");
    };

    return (
        <nav className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-md">
            <Link to="/" className="font-bold text-xl">
                WeatherApp
            </Link>

            <div className="flex items-center space-x-6">
                {user?.role !== "admin" && (
                    <Link to="/">Home</Link>
                )}

                {/* Only normal users see Favorites */}
                {user?.role !== "admin" && (
                    <Link to="/favorites">Favorites</Link>
                )}

                {/* Admin-only link */}
                {user?.role === "admin" && (
                    <Link to="/admin/users" className="font-semibold">
                        Users
                    </Link>
                )}

                <span className="font-medium bg-white text-blue-600 px-3 py-1 rounded cursor-default">
                    {user?.name}
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
