import WeatherCondition from "@/enums/weather-condition.enum";
import { WeatherForecastPart, WeatherPart } from "@/models";

import { mostWeatherCondition } from "@/helper/weather-forecast.helper";

describe("getWeatherForecastList", () => {
    test.todo("getWeatherForecastList");
});

describe("mostWeatherCondition", () => {
    test.each([
        ["should return WeatherCondition.null for empty list", WeatherCondition.null, []],
        ["should return WeatherCondition.snow if this is the most in the list", WeatherCondition.snow, [
            { weather: [{ description: "snow" } as WeatherPart] } as WeatherForecastPart,
            { weather: [{ description: "snow" } as WeatherPart] } as WeatherForecastPart,
            { weather: [{ description: "clear" } as WeatherPart] } as WeatherForecastPart,
            { weather: [{ description: "rain" } as WeatherPart] } as WeatherForecastPart,
            { weather: [{ description: "sun" } as WeatherPart] } as WeatherForecastPart]
        ],
        ["should return WeatherCondition.sun, if it is the only entry", WeatherCondition.sun, [{ weather: [{ description: "sun" } as WeatherPart] } as WeatherForecastPart]],
        ["should return WeatherCondition.null, if the list as multiple values with same amount", WeatherCondition.null, [
            { weather: [{ description: "clear" } as WeatherPart] } as WeatherForecastPart,
            { weather: [{ description: "rain" } as WeatherPart] } as WeatherForecastPart,
            { weather: [{ description: "sun" } as WeatherPart] } as WeatherForecastPart]
        ]
    ])("%s", (_, expected, list) => {
        // Arrange + Act
        const actual: WeatherCondition = mostWeatherCondition(list as WeatherForecastPart[]);

        // Assert
        expect(actual).toBe(expected);
    });
});
