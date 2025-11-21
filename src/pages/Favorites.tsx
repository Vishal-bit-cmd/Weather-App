import { useEffect, useState } from "react";
import API from "../api/api";
import { Link } from "react-router-dom";
import { type City } from "../types";

export default function FavoritesPage() {
    const [favorites, setFavorites] = useState<City[]>([]);

    const fetchFavorites = async () => {
        const { data } = await API.get("/favorites");
        setFavorites(data);
    };

    useEffect(() => {
        fetchFavorites();
    }, []);

    const removeFavorite = async (id: string) => {
        try {
            await API.delete(`/favorites/${id}`);
            setFavorites((prev) => prev.filter((f) => f._id !== id));
        } catch (err) {
            alert("❌ Failed to remove favorite");
        }
    };

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">Your Favorites</h1>

            {favorites.length === 0 && <p>No favorites added yet.</p>}

            <div className="space-y-4">
                {favorites.map((fav) => (
                    <div
                        key={fav._id}
                        className="border p-4 rounded-lg shadow-md bg-white"
                    >
                        <h2 className="text-xl font-bold">
                            {fav.name}, {fav.country}
                        </h2>

                        <div className="flex items-center space-x-4 mt-2">
                            <img
                                src={fav.forecast[0]?.iconUrl}
                                className="w-16 h-16"
                            />
                            <div>
                                <p className="font-semibold">
                                    {fav.forecast[0]?.avgTemp}°C
                                </p>
                                <p className="text-gray-600">
                                    {fav.forecast[0]?.condition}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-6 mt-4">
                            <Link
                                to={`/city/${fav.name}`}
                                className="text-blue-600 font-semibold hover:underline"
                            >
                                View Details →
                            </Link>

                            <button
                                className="text-red-600 font-semibold hover:underline"
                                onClick={() => removeFavorite(fav._id!)}
                            >
                                Remove ✖
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
