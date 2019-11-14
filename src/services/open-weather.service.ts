import { Observable, of, throwError } from "rxjs";
import { map } from "rxjs/operators";

import { validate, required } from "@/decorator";
import { AirPollutionType, ApiCallState, ValidationRequiredType } from "@/enums";
import WeatherCondition from "@/enums/weather-condition.enum";
import { format, isCoordSet, isNameSet } from "@/helper";
import { CarbonMonoxide, City, NitrogenDioxide, Ozone, SulfurDioxide, UvIndex, WeatherCurrent, WeatherForecast, WeatherForecastPart } from "@/models";
import { apiService } from "@/services/api.service";

class OpenWeatherService {

    private readonly airPollutionUrl: string = "http://api.openweathermap.org/pollution/v1/%s/%s/%s.json?appid=%s";

    private readonly currentWeatherUrl: string = "http://api.openweathermap.org/data/2.5/weather?q={0}&units=metric&APPID={1}";

    private readonly uvIndexUrl: string = "http://api.openweathermap.org/data/2.5/uvi?lat={0}&lon={1}&APPID={2}";

    private readonly weatherForecastUrl: string = "http://api.openweathermap.org/data/2.5/forecast?q={0}&units=metric&APPID={1}";

    @validate(of(undefined))
    loadCarbonMonoxide(
        @required(ValidationRequiredType.Object) city: City,
        @required(ValidationRequiredType.String) dateTime: string,
        @required(ValidationRequiredType.Int, [0]) accuracy: number,
        @required(ValidationRequiredType.String) appId: string): Observable<CarbonMonoxide | undefined> {
        return this.loadAirPollution<CarbonMonoxide>(city, AirPollutionType.CarbonMonoxide, dateTime, accuracy, appId);
    }

    @validate(of(undefined))
    loadNitrogenDioxide(
        @required(ValidationRequiredType.Object) city: City,
        @required(ValidationRequiredType.String) dateTime: string,
        @required(ValidationRequiredType.Int, [0]) accuracy: number,
        @required(ValidationRequiredType.String) appId: string): Observable<NitrogenDioxide | undefined> {
        return this.loadAirPollution<NitrogenDioxide>(city, AirPollutionType.NitrogenDioxide, dateTime, accuracy, appId);
    }

    @validate(of(undefined))
    loadOzone(
        @required(ValidationRequiredType.Object) city: City,
        @required(ValidationRequiredType.String) dateTime: string,
        @required(ValidationRequiredType.Int, [0]) accuracy: number,
        @required(ValidationRequiredType.String) appId: string): Observable<Ozone | undefined> {
        return this.loadAirPollution<Ozone>(city, AirPollutionType.Ozone, dateTime, accuracy, appId);
    }

    @validate(of(undefined))
    loadSulfurDioxide(
        @required(ValidationRequiredType.Object) city: City,
        @required(ValidationRequiredType.String) dateTime: string,
        @required(ValidationRequiredType.Int, [0]) accuracy: number,
        @required(ValidationRequiredType.String) appId: string): Observable<SulfurDioxide | undefined> {
        return this.loadAirPollution<SulfurDioxide>(city, AirPollutionType.SulfurDioxide, dateTime, accuracy, appId);
    }

    @validate(of(undefined))
    loadUvIndex(
        @required(ValidationRequiredType.Object) city: City,
        @required(ValidationRequiredType.String) appId: string): Observable<UvIndex> {
        if (!isCoordSet(city)) {
            throwError(ApiCallState.CoordNotSet);
        }

        return apiService.get<any>(format(this.uvIndexUrl, city.coord.lat.toFixed(2), city.coord.lon.toFixed(2), appId));
    }

    @validate(of(undefined))
    loadWeatherCurrent(
        @required(ValidationRequiredType.Object) city: City,
        @required(ValidationRequiredType.String) appId: string): Observable<WeatherCurrent> {
        if (!isNameSet(city)) {
            throwError(ApiCallState.CityNotSet);
        }

        return apiService
            .get<any>(format(this.currentWeatherUrl, city.name, appId))
            .pipe(
                map((response: WeatherCurrent) => {
                    if (!!response) {
                        response.weatherCondition = WeatherCondition.getByDescription(response.weather[0].description);
                    }
                    return response;
                }));
    }

    @validate(of(undefined))
    loadWeatherForecast(
        @required(ValidationRequiredType.Object) city: City,
        @required(ValidationRequiredType.String) appId: string): Observable<WeatherForecast> {
        if (!isCoordSet(city)) {
            throwError(ApiCallState.CoordNotSet);
        }

        return apiService
            .get<any>(format(this.weatherForecastUrl, city.name, appId))
            .pipe(
                map((response: WeatherForecast) => {
                    if (!!response) {
                        response.list.forEach((weatherForecastPart: WeatherForecastPart) =>
                            weatherForecastPart.weatherCondition = WeatherCondition.getByDescription(weatherForecastPart.weather[0].description));
                    }
                    return response;
                }));
    }

    @validate(of(undefined))
    private loadAirPollution<T>(
        @required(ValidationRequiredType.Object) city: City,
        @required(ValidationRequiredType.Enum) airPollutionType: AirPollutionType,
        @required(ValidationRequiredType.String) dateTime: string,
        @required(ValidationRequiredType.Int, [0]) accuracy: number,
        @required(ValidationRequiredType.String) appId: string): Observable<T | undefined> {

        if (!isCoordSet(city)) {
            throwError(ApiCallState.CoordNotSet);
        }

        return apiService
            .get<T | undefined>(format(
                this.airPollutionUrl,
                airPollutionType.toString(),
                `${city.coord.lat.toFixed(accuracy)}, ${city.coord.lon.toFixed(accuracy)}`,
                dateTime,
                appId));
    }
}

// Export a singleton instance in the global namespace
export const openWeatherService = new OpenWeatherService();
