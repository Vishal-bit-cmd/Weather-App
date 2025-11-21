import { Link } from "react-router-dom";

export default function NavBar() {
    return (
        <nav className="bg-blue-600 text-white p-4 flex justify-between">
            <Link to="/" className="font-bold text-xl">WeatherApp</Link>
            <div className="space-x-4">
                <Link to="/">Home</Link>
                <Link to="/favorites">Favorites</Link>
            </div>
        </nav>
    );
}
