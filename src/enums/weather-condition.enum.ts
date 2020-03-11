/*eslint-disable */

import { IWeatherCondition } from "@/models/weather-condition";

export default class WeatherCondition {
  static null: IWeatherCondition = { id: 0, description: "Null", wallpaper: "/assets/weather_wallpaper_dummy.png", icon: "/assets/weather_dummy.png", count: 0 };
  static clear: IWeatherCondition = { id: 1, description: "Clear", wallpaper: "/assets/weather_wallpaper_clear.png", icon: "/assets/weather_clear.png", count: 0 };
  static clouds: IWeatherCondition = { id: 2, description: "Clouds", wallpaper: "/assets/weather_wallpaper_cloud.png", icon: "/assets/weather_cloud.png", count: 0 };
  static drizzle: IWeatherCondition = { id: 3, description: "Drizzle", wallpaper: "/assets/weather_wallpaper_drizzle.png", icon: "/assets/weather_drizzle.png", count: 0 };
  static fog: IWeatherCondition = { id: 4, description: "Fog", wallpaper: "/assets/weather_wallpaper_fog.png", icon: "/assets/weather_fog.png", count: 0 };
  static haze: IWeatherCondition = { id: 5, description: "Haze", wallpaper: "/assets/weather_wallpaper_haze.png", icon: "/assets/weather_haze.png", count: 0 };
  static mist: IWeatherCondition = { id: 6, description: "Mist", wallpaper: "/assets/weather_wallpaper_mist.png", icon: "/assets/weather_mist.png", count: 0 };
  static rain: IWeatherCondition = { id: 7, description: "Rain", wallpaper: "/assets/weather_wallpaper_rain.png", icon: "/assets/weather_rain.png", count: 0 };
  static sleet: IWeatherCondition = { id: 8, description: "Sleet", wallpaper: "/assets/weather_wallpaper_sleet.png", icon: "/assets/weather_sleet.png", count: 0 };
  static snow: IWeatherCondition = { id: 9, description: "Snow", wallpaper: "/assets/weather_wallpaper_snow.png", icon: "/assets/weather_snow.png", count: 0 };
  static squalls: IWeatherCondition = { id: 10, description: "Squalls", wallpaper: "/assets/weather_wallpaper_squalls.png", icon: "/assets/weather_squalls.png", count: 0 };
  static sun: IWeatherCondition = { id: 11, description: "Sun", wallpaper: "/assets/weather_wallpaper_sun.png", icon: "/assets/weather_sun.png", count: 0 };
  static thunderstorm: IWeatherCondition = { id: 12, description: "Thunderstorm", wallpaper: "/assets/weather_wallpaper_thunderstorm.png", icon: "/assets/weather_thunderstorm.png", count: 0 };

  static values: IWeatherCondition[] = [
    WeatherCondition.null,
    WeatherCondition.clear,
    WeatherCondition.clouds,
    WeatherCondition.drizzle,
    WeatherCondition.fog,
    WeatherCondition.haze,
    WeatherCondition.mist,
    WeatherCondition.rain,
    WeatherCondition.sleet,
    WeatherCondition.snow,
    WeatherCondition.squalls,
    WeatherCondition.sun,
    WeatherCondition.thunderstorm
  ];

  static getByDescription(description: string): IWeatherCondition {
    const weatherCondition = !!description
      ? WeatherCondition.values
        .find((condition: any) =>
          condition.description.toUpperCase().indexOf(description.toUpperCase()) !== -1
          || description.toUpperCase().indexOf(condition.description.toUpperCase()) !== -1)
      : WeatherCondition.null;

    return !!weatherCondition ? weatherCondition : WeatherCondition.null;
  }
}
