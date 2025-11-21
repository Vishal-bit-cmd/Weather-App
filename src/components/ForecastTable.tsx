import { type Forecast } from "../types";

interface Props {
    forecast: Forecast[];
}

export default function ForecastTable({ forecast }: Props) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 mt-6">
            {forecast.map(day => (
                <div key={day.date} className="bg-white border rounded-xl p-4 text-center shadow hover:shadow-lg transition-shadow duration-300">
                    <p className="font-bold mb-2">{day.date}</p>
                    <img src={day.iconUrl} alt={day.condition} className="mx-auto w-16 h-16" />
                    <p className="mt-2 font-semibold">{day.condition}</p>
                    <p className="text-gray-600">Avg: {day.avgTemp}°C</p>
                    <p className="text-gray-600">Max: {day.maxTemp}°C</p>
                    <p className="text-gray-600">Min: {day.minTemp}°C</p>
                </div>
            ))}
        </div>
    );
}
