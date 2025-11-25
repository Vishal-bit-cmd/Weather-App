import { type City } from "../types";
import API from "../api/api";
import Cookies from "js-cookie";

interface Props {
    city: City;
}

export default function FavoriteButton({ city }: Props) {
    const handleAdd = async () => {
        const token = Cookies.get("accessToken");
        if (!token) return alert("Please login first");

        try {
            await API.post("/favorites", {
                name: city.name,
                country: city.country
            });
            alert("Added to favorites!");
        } catch (err: any) {
            alert(err.response?.data?.message || "Failed to add to favorites");
        }
    };

    return (
        <button
            onClick={handleAdd}
            className="absolute top-4 right-4 bg-yellow-400 hover:bg-yellow-500 text-white p-3 rounded-full shadow-lg transition-colors duration-200"
        >
            ★
        </button>
    );
}
