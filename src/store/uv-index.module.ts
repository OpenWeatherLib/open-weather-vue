import { of } from "rxjs";
import { catchError, take } from "rxjs/operators";
import { ActionTree, GetterTree, Module, MutationTree } from "vuex";
import { City, UvIndex } from "@/models";
import { openWeatherService } from "@/services";
import { RootState } from "./root-state";

export interface UvIndexState {
    error?: any;
    isLoading?: boolean;
    uvIndex?: UvIndex;
}

const state: UvIndexState = {
    error: undefined,
    isLoading: false,
    uvIndex: undefined
};

const getters: GetterTree<UvIndexState, RootState> = {
    error: (state: UvIndexState) => state.error,
    isLoading: (state: UvIndexState) => state.isLoading,
    uvIndex: (state: UvIndexState) => state.uvIndex
};

const mutations: MutationTree<UvIndexState> = {
    setError(state: UvIndexState, error: any) { state.error = error; },
    setIsLoading(state: UvIndexState, isLoading: boolean) { state.isLoading = isLoading; },
    setUvIndex(state: UvIndexState, uvIndex: UvIndex) { state.uvIndex = uvIndex; }
};

const actions: ActionTree<UvIndexState, RootState> = {
    loadUvIndex({ commit, getters }): void {
        commit(mutations.setUvIndex.name, undefined);
        commit(mutations.setError.name, undefined);
        commit(mutations.setIsLoading.name, true);

        const city: City = getters.city;
        const appId: string = getters.openWeatherApiKey;

        openWeatherService
            .loadUvIndex(city, appId)
            .pipe(
                catchError((error: any) => {
                    commit(mutations.setError.name, error);
                    return of(undefined);
                }),
                take(1)
            )
            .subscribe((uvIndex: UvIndex | undefined) => {
                commit(mutations.setUvIndex.name, uvIndex);
                commit(mutations.setIsLoading.name, false);
            });
    }
};

export const uvIndexModule: Module<UvIndexState, RootState> = {
    namespaced: false,
    state,
    getters,
    mutations,
    actions
};
