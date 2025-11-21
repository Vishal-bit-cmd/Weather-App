import { type City } from "../types";
import API from "../api/api";

interface Props {
    city: City;
}

export default function FavoriteButton({ city }: Props) {
    const handleAdd = async () => {
        try {
            await API.post("/favorites", city);
            alert("Added to favorites!");
        } catch (err) {
            alert("Already in favorites or error occurred");
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
