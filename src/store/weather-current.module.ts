import { of } from "rxjs";
import { catchError, take } from "rxjs/operators";
import { ActionTree, GetterTree, Module, MutationTree } from "vuex";
import WeatherCondition from "@/enums/weather-condition.enum";
import { City, WeatherCurrent } from "@/models";
import { openWeatherService } from "@/services";
import { RootState } from "./root-state";

export interface WeatherCurrentState {
    error?: any;
    isLoading?: boolean;
    weatherCurrent?: WeatherCurrent;
}

// TODO Remove dummy data
const state: WeatherCurrentState = {
    error: undefined,
    isLoading: false,
    weatherCurrent: {
        coord: {
            lat: 49.45,
            lon: 11.083333
        },
        weather: [],
        base: "",
        main: {
            temp: 12.27,
            temp_min: 11.4,
            temp_max: 13.5,
            temp_kf: 0,
            pressure: 1031,
            sea_level: 0,
            grnd_level: 0,
            humidity: 46
        },
        visibility: 0,
        wind: {
            speed: 0
        },
        clouds: {
            all: 0
        },
        dt: 0,
        sys: {
            type: 0,
            id: 0,
            message: 0,
            country: "",
            sunrise: 0,
            sunset: 0,
        },
        id: 0,
        name: "",
        cod: 0,
        weatherCondition: WeatherCondition.clear
    }
};

const getters: GetterTree<WeatherCurrentState, RootState> = {
    error: (state: WeatherCurrentState) => state.error,
    isLoading: (state: WeatherCurrentState) => state.isLoading,
    weatherCurrent: (state: WeatherCurrentState) => state.weatherCurrent
};

const mutations: MutationTree<WeatherCurrentState> = {
    setError(state: WeatherCurrentState, error: any) { state.error = error; },
    setIsLoading(state: WeatherCurrentState, isLoading: boolean) { state.isLoading = isLoading; },
    setWeatherCurrent(state: WeatherCurrentState, weatherCurrent: WeatherCurrent) { state.weatherCurrent = weatherCurrent; }
};

const actions: ActionTree<WeatherCurrentState, RootState> = {
    loadWeatherCurrent({ commit, getters }): void {
        commit(mutations.setWeatherCurrent.name, undefined);
        commit(mutations.setError.name, undefined);
        commit(mutations.setIsLoading.name, true);

        const city: City = getters.city;
        const appId: string = getters.openWeatherApiKey;

        openWeatherService
            .loadWeatherCurrent(city, appId)
            .pipe(
                catchError((error: any) => {
                    commit(mutations.setError.name, error);
                    return of(undefined);
                }),
                take(1)
            )
            .subscribe((weatherCurrent: WeatherCurrent | undefined) => {
                commit(mutations.setWeatherCurrent.name, weatherCurrent);
                commit(mutations.setIsLoading.name, false);
            });
    }
};

export const weatherCurrentModule: Module<WeatherCurrentState, RootState> = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};
