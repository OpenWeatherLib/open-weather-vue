import { City } from "@/models/city";
import { WeatherForecastPart } from "@/models/weather-forecast-part";

export interface WeatherForecast {
  cod: string;
  message: number;
  cnt: number;
  list: WeatherForecastPart[];
  city: City;
}
