import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api/api";
import ForecastTable from "../components/ForecastTable";
import { type City } from "../types";

export default function CityDetails() {
    const { id } = useParams();   
    const [city, setCity] = useState<City | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCity = async () => {
            try {
                let data;

                try {
                    const res = await API.get(`/cities/${id}`);
                    data = res.data;
                } catch {
                    const res = await API.get(`/favorites/${id}`);
                    data = res.data;
                }

                setCity(data);
            } catch (err) {
                alert("City not found");
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchCity();
    }, [id]);

    const addToFavorites = async (city: City) => {
        try {
            await API.post("/favorites", {
                name: city.name,
                country: city.country,
                forecast: city.forecast
            });

            alert(`${city.name} added to favorites`);
        } catch (err: any) {
            alert(err.response?.data?.message || "Failed to add favorite");
        }
    };

    if (loading) return <p>Loading...</p>;
    if (!city) return <p>City not found</p>;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">
                {city.name}, {city.country}
            </h1>

            <ForecastTable forecast={city.forecast} />

            <button
                className="fixed top-18 right-1.5 bg-blue-500 text-white px-4 py-2 rounded shadow-lg"
                onClick={() => addToFavorites(city)}
            >
                Add to Favorites
            </button>
        </div>
    );
}
