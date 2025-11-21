import { useState } from "react";

interface Props {
    onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: Props) {
    const [query, setQuery] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!query) return;
        onSearch(query);
    };

    return (
        <form onSubmit={handleSubmit} className="flex mt-4">
            <input
                type="text"
                placeholder="Search city..."
                className="p-2 border border-gray-300 rounded-l w-full"
                value={query}
                onChange={e => setQuery(e.target.value)}
            />
            <button className="bg-blue-600 text-white px-4 rounded-r">Search</button>
        </form>
    );
}
