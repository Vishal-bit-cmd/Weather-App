import { useState, useEffect, useContext } from "react";
import API from "../api/api";
import SearchBar from "../components/SearchBar";
import CityCard from "../components/CityCard";
import { type City } from "../types";
import { AuthContext } from "../context/AuthContext";

export default function Home() {
  const [city, setCity] = useState<City | null>(null);
  const [favorites, setFavorites] = useState<City[]>([]);
  const { user } = useContext(AuthContext);

  const handleSearch = async (query: string) => {
    setCity(null); // reset city so UI updates
    try {
      const { data } = await API.get(`/cities/search?q=${query}`, {
        withCredentials: true,
      });
      const cityData = data.city || data.cityData || data;
      setCity(cityData);
    } catch {
      alert("City not found");
      setCity(null);
    }
  };

  useEffect(() => {
    const fetchFavs = async () => {
      try {
        const { data } = await API.get("/favorites", { withCredentials: true });
        setFavorites(data.map((item: any) => item.favorite || item));
      } catch {
        console.log("Failed to load favorites");
      }
    };
    fetchFavs();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Welcome, {user?.name} ({user?.role})</h1>
      <SearchBar onSearch={handleSearch} />

      {city && (
        <div className="mt-6">
          <CityCard city={city} />
        </div>
      )}

      <h2 className="text-2xl font-bold mt-10 mb-4">⭐ Favorites</h2>
      {favorites.length === 0 && <p className="text-gray-600">No favorites added yet.</p>}

      <div className="space-y-4">
        {favorites.map((fav) => (
          <div
            key={fav._id}
            className="border p-4 rounded-lg shadow-md bg-white flex justify-between items-center"
          >
            <div>
              <h3 className="text-xl font-semibold">{fav.name}, {fav.country}</h3>
              <p className="text-gray-700 text-sm">
                {fav.forecast?.[0]?.condition} — {fav.forecast?.[0]?.avgTemp}°C
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
