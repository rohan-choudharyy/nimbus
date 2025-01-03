import { Coordinates } from "@/api/types";
import { weatherAPI } from "@/api/weather";
import { useQuery } from "@tanstack/react-query";

export const KEYS = {
    Weather : (coords : Coordinates) => ["weather", coords] as const,
    Forecast : (coords : Coordinates) => ["forecast", coords] as const,
    Location : (coords : Coordinates) => ["location", coords] as const,
    Search : (query: string) => ["search-location", query] as const,
} as const;

export function useWeatherQuery(coordinates: Coordinates | null){
    return useQuery({
        queryKey: KEYS.Weather(coordinates ?? {lat : 0, lon : 0}),
        queryFn: () => 
            coordinates ? weatherAPI.getCurrentWeather(coordinates) : null,
        enabled: !!coordinates
    })
} 

export function useForecastQuery(coordinates: Coordinates | null){
    return useQuery({
        queryKey: KEYS.Forecast(coordinates ?? {lat : 0, lon : 0}),
        queryFn: () => 
            coordinates ? weatherAPI.getForecast(coordinates) : null,
        enabled: !!coordinates
    })
} 

export function useReverseGeolocationQuery(coordinates: Coordinates | null){
    return useQuery({
        queryKey: KEYS.Location(coordinates ?? {lat : 0, lon : 0}),
        queryFn: () => 
            coordinates ? weatherAPI.reverseGeocode(coordinates) : null,
        enabled: !!coordinates
    })
} 

export function useSearchLocation(query: string){
    return useQuery({
        queryKey: KEYS.Search(query),
        queryFn: () => weatherAPI.searchLocations(query),
        enabled: query.length >= 3,
    })
}