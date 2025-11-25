import { useEffect, useState } from "react";
import API from "../api/api";
import { Link } from "react-router-dom";
import { type City } from "../types";

export default function Favorites() {
    const [favorites, setFavorites] = useState<City[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchFavorites = async () => {
        try {
            const { data } = await API.get("/favorites");
            setFavorites(data);
        } catch (err) {
            console.error("Failed to load favorites:", err);
        } finally {
            setLoading(false);
        }
    };

    const removeFavorite = async (id: string) => {
        try {
            await API.delete(`/favorites/${id}`);
            fetchFavorites();
        } catch {
            alert("Failed to remove favorite");
        }
    };

    useEffect(() => {
        fetchFavorites();
    }, []);

    if (loading) return <p className="p-6">Loading...</p>;

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">⭐ Your Favorites</h2>

            {favorites.length === 0 && (
                <p className="text-gray-600 text-lg">No favorites added yet.</p>
            )}

            <div className="space-y-4">
                {favorites.map((fav) => (
                    <div
                        key={fav._id}
                        className="border p-4 rounded-lg bg-white shadow-md flex justify-between items-center hover:shadow-lg transition"
                    >
                        <div>
                            <h3 className="text-xl font-semibold">
                                {fav.name}, {fav.country}
                            </h3>
                            <p className="text-gray-700 text-sm">
                                {fav.forecast?.[0]?.condition} – {fav.forecast?.[0]?.avgTemp}°C
                            </p>
                        </div>

                        <div className="flex gap-4">
                            {/* Redirect to details by city name */}
                            <Link
                                to={`/city/${fav.name}`}
                                className="text-blue-600 hover:underline font-semibold"
                            >
                                View full forecast →
                            </Link>

                            <button
                                onClick={() => removeFavorite(fav._id!)} // <-- fixes TS error with !
                                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
