import WeatherCondition from "@/enums/weather-condition.enum";
import { any } from "@/helper/array.helper";
import { IWeatherCondition, WeatherForecastPart } from "@/models";
import { WeatherForecastState } from "@/store/weather-forecast.module";

export const getWeatherForecastList = (state: WeatherForecastState): WeatherForecastPart[] => !!state.weatherForecast
    ? !!state.filter
        ? state.weatherForecast.list.filter((value: WeatherForecastPart) => JSON.stringify(value).includes(`${state.filter}`))
        : state.weatherForecast.list
    : [];

export const mostWeatherCondition = (list: WeatherForecastPart[]): WeatherCondition => {
    if (any(list)) {
        list.forEach((weatherForecastPart: WeatherForecastPart) =>
            // @ts-ignore
            WeatherCondition.values
                .find((condition: IWeatherCondition) => condition === WeatherCondition.getByDescription(weatherForecastPart.weather[0].description))
                .count += 1);

        let foundMostWeatherCondition: WeatherCondition;
        const sortedValues: IWeatherCondition[] = WeatherCondition.values.sort((x1: IWeatherCondition, x2: IWeatherCondition) => x1.count > x2.count ? -1 : 1);
        if (sortedValues.filter((x: IWeatherCondition) => x.count === sortedValues[0].count).length > 1) {
            foundMostWeatherCondition = WeatherCondition.null;
        } else {
            foundMostWeatherCondition = sortedValues[0];
        }

        WeatherCondition.values.forEach((x: IWeatherCondition) => x.count = 0);

        return foundMostWeatherCondition;
    } else {
        return WeatherCondition.null;
    }
};
