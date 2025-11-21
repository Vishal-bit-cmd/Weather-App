import { type City } from "../types";
import { Link } from "react-router-dom";
import FavoriteButton from "./FavoriteButton";

interface Props {
    city: City;
}

export default function CityCard({ city }: Props) {
    return (
        <div className="relative border rounded-xl shadow-lg p-6 bg-white hover:shadow-2xl transition-shadow duration-300">
            <FavoriteButton city={city} />

            <h2 className="text-2xl font-bold mb-2">{city.name}, {city.country}</h2>

            <div className="flex items-center space-x-4">
                <img src={city.forecast[0]?.iconUrl} alt={city.forecast[0]?.condition} className="w-20 h-20" />
                <div>
                    <p className="text-lg font-semibold">Avg Temp: {city.forecast[0]?.avgTemp}°C</p>
                    <p className="text-gray-600">{city.forecast[0]?.condition}</p>
                </div>
            </div>

            <Link
                to={`/city/${city.name}`}
                className="block mt-4 text-blue-600 font-semibold hover:underline"
            >
                View Full Forecast
            </Link>
        </div>
    );
}
