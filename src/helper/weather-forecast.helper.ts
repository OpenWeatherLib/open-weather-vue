import WeatherCondition from "@/enums/weather-condition.enum";
import { any } from "@/helper/array.helper";
import { WeatherForecastPart } from "@/models";
import { WeatherForecastState } from "@/store/weather-forecast.module";

export const getWeatherForecastList = (state: WeatherForecastState): WeatherForecastPart[] => !!state.weatherForecast
    ? !!state.filter
        ? state.weatherForecast.list.filter((value: WeatherForecastPart) => JSON.stringify(value).includes(`${state.filter}`))
        : state.weatherForecast.list
    : [];

export const mostWeatherCondition = (list: WeatherForecastPart[]): WeatherCondition => {
    if (any(list)) {
        list.forEach((weatherForecastPart: WeatherForecastPart) =>
            WeatherCondition.values
                .find((condition: any) => condition === WeatherCondition.getByDescription(weatherForecastPart.weather[0].description))
                .count += 1);

        let foundMostWeatherCondition: WeatherCondition;
        const sortedValues: any[] = WeatherCondition.values.sort((x1: any, x2: any) => x1.count > x2.count ? -1 : 1);
        if (sortedValues.filter((x: any) => x.count === sortedValues[0].count).length > 1) {
            foundMostWeatherCondition = WeatherCondition.null;
        } else {
            foundMostWeatherCondition = sortedValues[0];
        }

        WeatherCondition.values.forEach((x: any) => x.count = 0);

        return foundMostWeatherCondition;
    } else {
        return WeatherCondition.null;
    }
};
