import { useEffect, useState, useContext } from "react";
import API from "../api/api";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Favorites() {
    const { user } = useContext(AuthContext);
    const [favorites, setFavorites] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchFavorites = async () => {
        try {
            const { data } = await API.get("/favorites", { withCredentials: true });
            setFavorites(data);
        } catch (err) {
            console.error("Failed to load favorites", err);
        } finally {
            setLoading(false);
        }
    };

    const removeFavorite = async (id: string) => {
        try {
            await API.delete(`/favorites/${id}`, { withCredentials: true });
            setFavorites(prev => prev.filter(fav => fav._id !== id));
        } catch {
            alert("Failed to remove favorite");
        }
    };

    useEffect(() => {
        if (user) fetchFavorites();
    }, [user]);

    if (!user) return <p className="p-6 text-center">Please log in to view favorites.</p>;
    if (loading) return <p className="p-6 text-center">Loading...</p>;

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">⭐ Your Favorites</h2>

            {favorites.length === 0 ? (
                <p>No favorites added yet.</p>
            ) : (
                <div className="space-y-4">
                    {favorites.map((fav) => (
                        <div
                            key={fav._id}
                            className="border p-4 rounded-lg shadow-md flex justify-between items-center bg-white"
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
                                <Link
                                    to={`/city/${fav.name}`}
                                    className="text-blue-600 underline"
                                >
                                    View full →
                                </Link>

                                <button
                                    onClick={() => removeFavorite(fav._id)}
                                    className="bg-red-500 text-white px-3 py-1 rounded"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
