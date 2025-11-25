import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api/api";
import ForecastTable from "../components/ForecastTable";
import { type City } from "../types";

export default function CityDetails() {
    const { name } = useParams();
    const [city, setCity] = useState<City | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCity = async () => {
            if (!name) return;

            try {
                const res = await API.get(`/cities/search?q=${name}`);
                const data = res.data.city || res.data.cityData || res.data;
                setCity(data);
            } catch {
                alert("City not found");
            } finally {
                setLoading(false);
            }
        };

        fetchCity();
    }, [name]);

    const addToFavorites = async () => {
        if (!city) return;
        try {
            await API.post("/favorites", {
                name: city.name,
                country: city.country
            });
            alert(`${city.name} added to favorites`);
        } catch (err: any) {
            alert(err.response?.data?.message || "Failed to add favorite");
        }
    };

    if (loading) return <p className="text-center mt-4">Loading...</p>;
    if (!city) return <p className="text-center mt-4">City not found</p>;

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-4">
                {city.name}, {city.country}
            </h1>

            <ForecastTable forecast={city.forecast} />

            <button
                className="fixed bottom-6 right-6 bg-blue-600 text-white px-5 py-3 rounded-lg shadow-md hover:bg-blue-700"
                onClick={addToFavorites}
            >
                Add to Favorites
            </button>
        </div>
    );
}
