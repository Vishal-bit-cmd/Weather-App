import { useContext } from "react";
import API from "../api/api";
import { AuthContext } from "../context/AuthContext";
import { type City } from "../types";

interface Props {
    city: City;
}

export default function FavoriteButton({ city }: Props) {
    const { user } = useContext(AuthContext);

    const handleAdd = async () => {
        if (!user) return alert("Please login first");

        try {
            await API.post(
                "/favorites",
                {
                    name: city.name,
                    country: city.country,
                    forecast: city.forecast
                },
                { withCredentials: true }
            );
            alert("Added to favorites!");
        } catch (err: any) {
            alert(err.response?.data?.message || "Failed to add");
        }
    };

    return (
        <button
            onClick={handleAdd}
            className="absolute top-4 right-4 bg-yellow-400 hover:bg-yellow-500 text-white p-3 rounded-full shadow-lg"
        >
            ★
        </button>
    );
}
