export interface Forecast {
    date: string;
    avgTemp: number;
    maxTemp: number;
    minTemp: number;
    condition: string;
    icon: string;
    iconUrl: string;
    country: string;
}

export interface City {
    _id: string;
    name: string;
    country: string;
    forecast: Forecast[];
}
