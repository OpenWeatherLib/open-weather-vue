import { of } from "rxjs";
import { catchError, take } from "rxjs/operators";
import { ActionTree, GetterTree, Module, MutationTree } from "vuex";
import { getWeatherForecastList, mostWeatherCondition } from "@/helper/weather-forecast.helper";
import { City, WeatherForecast } from "@/models";
import { openWeatherService } from "@/services";
import { RootState } from "./root-state";

export interface WeatherForecastState {
    error?: any;
    filter?: string;
    isLoading?: boolean;
    weatherForecast?: WeatherForecast;
}

const state: WeatherForecastState = {
    error: undefined,
    filter: undefined,
    isLoading: false,
    weatherForecast: undefined
};

const getters: GetterTree<WeatherForecastState, RootState> = {
    error: (state: WeatherForecastState) => state.error,
    isLoading: (state: WeatherForecastState) => state.isLoading,
    mostWeatherCondition: (state: WeatherForecastState) => mostWeatherCondition(getWeatherForecastList(state)),
    weatherForecast: (state: WeatherForecastState) => state.weatherForecast,
    weatherForecastList: (state: WeatherForecastState) => getWeatherForecastList(state)
};

const mutations: MutationTree<WeatherForecastState> = {
    setError(state: WeatherForecastState, error: any) { state.error = error; },
    setFilter(state: WeatherForecastState, filter: string) { state.filter = filter; },
    setIsLoading(state: WeatherForecastState, isLoading: boolean) { state.isLoading = isLoading; },
    setWeatherForecast(state: WeatherForecastState, weatherForecast: WeatherForecast) { state.weatherForecast = weatherForecast; }
};

const actions: ActionTree<WeatherForecastState, RootState> = {
    loadWeatherForecast({ commit, getters }): void {
        commit(mutations.setWeatherForecast.name, undefined);
        commit(mutations.setError.name, undefined);
        commit(mutations.setIsLoading.name, true);

        const city: City = getters.city;
        const appId: string = getters.openWeatherApiKey;

        openWeatherService
            .loadWeatherForecast(city, appId)
            .pipe(
                catchError((error: any) => {
                    commit(mutations.setError.name, error);
                    return of(undefined);
                }),
                take(1)
            )
            .subscribe((weatherForecast: WeatherForecast | undefined) => {
                commit(mutations.setWeatherForecast.name, weatherForecast);
                commit(mutations.setIsLoading.name, false);
            });
    },
    setFilter({ commit }, filter: string): void {
        commit(mutations.setFilter.name, filter);
    }
};

export const weatherForecastModule: Module<WeatherForecastState, RootState> = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};
