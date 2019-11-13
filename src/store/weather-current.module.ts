import { of } from "rxjs";
import { catchError, take } from "rxjs/operators";
import { ActionTree, GetterTree, Module, MutationTree } from "vuex";
import { City, WeatherCurrent } from "@/models";
import { openWeatherService } from "@/services";
import { RootState } from "./root-state";

export interface WeatherCurrentState {
    error?: any;
    isLoading?: boolean;
    weatherCurrent?: WeatherCurrent;
}

const state: WeatherCurrentState = {
    error: undefined,
    isLoading: false,
    weatherCurrent: undefined
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
