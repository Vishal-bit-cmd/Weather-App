import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import API from "../api/api";
import ForecastTable from "../components/ForecastTable";
import { type City } from "../types";
import { AuthContext } from "../context/AuthContext";

export default function CityDetails() {
    const { name } = useParams();
    const [city, setCity] = useState<City | null>(null);
    const [favorites, setFavorites] = useState<City[]>([]);
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [adding, setAdding] = useState(false);

    useEffect(() => {
        if (!name) return;

        const fetchCity = async () => {
            try {
                const res = await API.get(`/cities/search?q=${name}`, { withCredentials: true });
                const data = res.data.city || res.data.cityData || res.data;
                setCity(data);
            } catch (err) {
                console.error("Failed to fetch city:", err);
                alert("City not found");
            } finally {
                setLoading(false);
            }
        };

        const fetchFavorites = async () => {
            if (!user) return;
            try {
                const { data } = await API.get("/favorites", { withCredentials: true });
                setFavorites(data);
            } catch (err) {
                console.error("Failed to load favorites:", err);
            }
        };

        fetchCity();
        fetchFavorites();
    }, [name, user]);

    const addToFavorites = async () => {
        if (!city || !user) return alert("Please login first");
        if (user.role === "admin") return alert("Admins cannot add favorites");

        const exists = favorites.find(f => f.name === city.name && f.country === city.country);
        if (exists) return alert("City is already in favorites");

        try {
            setAdding(true);
            const { data } = await API.post(
                "/favorites",
                { name: city.name, country: city.country },
                { withCredentials: true }
            );
            console.log("Favorite added:", data); // ✅ Debug
            setFavorites(prev => [...prev, data]);
            alert(`${city.name} added to favorites`);
        } catch (err: any) {
            console.error("Add favorite error:", err.response?.data || err);
            alert(err.response?.data?.message || "Failed to add favorite");
        } finally {
            setAdding(false);
        }
    };

    if (loading) return <p className="text-center mt-4">Loading...</p>;
    if (!city) return <p className="text-center mt-4">City not found</p>;

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-4">{city.name}, {city.country}</h1>
            <ForecastTable forecast={city.forecast} />
            {user?.role !== "admin" && (
                <button
                    className={`fixed bottom-6 right-6 bg-blue-600 text-white px-5 py-3 rounded-lg shadow-md hover:bg-blue-700 ${adding ? "opacity-50 cursor-not-allowed" : ""}`}
                    onClick={addToFavorites}
                    disabled={adding}
                >
                    {adding ? "Adding..." : "Add to Favorites"}
                </button>
            )}
        </div>
    );
}
