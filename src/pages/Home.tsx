import { useState, useEffect } from "react";
import API from "../api/api";
import SearchBar from "../components/SearchBar";
import CityCard from "../components/CityCard";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { type City } from "../types";

export default function Home() {
    const [city, setCity] = useState<City | null>(null);
    const [favorites, setFavorites] = useState<City[]>([]);

    const handleSearch = async (query: string) => {
        try {
            const { data } = await API.get(`/cities/search?q=${query}`);
            const cityData = data.city || data.cityData || data;
            setCity(cityData);
        } catch {
            alert("City not found");
            setCity(null);
        }
    };

    useEffect(() => {
        const token = Cookies.get("accessToken");
        if (!token) return; // do not fetch before login

        const fetchFavs = async () => {
            try {
                const { data } = await API.get("/favorites");
                setFavorites(data);
            } catch (err) {
                console.error("Failed to load favorites");
            }
        };
        fetchFavs();
    }, []);

    return (
        <div className="p-6 max-w-4xl mx-auto">

            <SearchBar onSearch={handleSearch} />

            {city && (
                <div className="mt-6">
                    <CityCard city={city} />
                </div>
            )}

            {/* ⭐ FAVORITES LIST */}
            <h2 className="text-2xl font-bold mt-10 mb-4">⭐ Favorites</h2>

            {favorites.length === 0 && (
                <p className="text-gray-600">No favorites added yet.</p>
            )}

            <div className="space-y-4">
                {favorites.map((fav) => (
                    <div
                        key={fav._id}
                        className="border p-4 rounded-lg shadow-md bg-white flex justify-between items-center"
                    >
                        <div>
                            <h3 className="text-xl font-semibold">
                                {fav.name}, {fav.country}
                            </h3>
                            <p className="text-gray-700 text-sm">
                                {fav.forecast[0]?.condition} — {fav.forecast[0]?.avgTemp}°C
                            </p>
                        </div>

                        <Link
                            to="/favorites"
                            className="text-blue-600 hover:underline font-semibold"
                        >
                            View →
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
