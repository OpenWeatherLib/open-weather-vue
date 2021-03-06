import { Coordinates } from "@/models/coordinates";

export interface City {
  id: number;
  name: string;
  country: string;
  population: number;
  coord: Coordinates;
  timezone: number;
  sunrise: number;
  sunset: number;
}
