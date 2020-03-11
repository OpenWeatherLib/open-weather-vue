import { Clouds } from "@/models/clouds";
import { Coordinates } from "@/models/coordinates";
import { Main } from "@/models/main";
import { Sys } from "@/models/sys";
import { IWeatherCondition } from "@/models/weather-condition";
import { WeatherPart } from "@/models/weather-part";
import { Wind } from "@/models/wind";

export interface WeatherCurrent {
  coord: Coordinates;
  weather: WeatherPart[];
  base: string;
  main: Main;
  visibility: number;
  wind: Wind;
  clouds: Clouds;
  dt: number;
  sys: Sys;
  id: number;
  name: string;
  cod: number;
  weatherCondition: IWeatherCondition;
}
