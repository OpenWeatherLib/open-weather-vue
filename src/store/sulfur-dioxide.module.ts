import { of } from "rxjs";
import { catchError, take } from "rxjs/operators";
import { ActionTree, GetterTree, Module, MutationTree } from "vuex";
import { City, SulfurDioxide } from "@/models";
import { openWeatherService } from "@/services";
import { RootState } from "./root-state";

export interface SulfurDioxideState {
    accuracy?: number;
    dateTime?: string;
    error?: any;
    isLoading?: boolean;
    sulfurDioxide?: SulfurDioxide;
}

const state: SulfurDioxideState = {
    accuracy: undefined,
    dateTime: undefined,
    error: undefined,
    isLoading: false,
    sulfurDioxide: undefined
};

const getters: GetterTree<SulfurDioxideState, RootState> = {
    accuracy: (state: SulfurDioxideState) => state.accuracy,
    dateTime: (state: SulfurDioxideState) => state.dateTime,
    error: (state: SulfurDioxideState) => state.error,
    isLoading: (state: SulfurDioxideState) => state.isLoading,
    sulfurDioxide: (state: SulfurDioxideState) => state.sulfurDioxide
};

const mutations: MutationTree<SulfurDioxideState> = {
    setAccuracy(state: SulfurDioxideState, accuracy: number) { state.accuracy = accuracy; },
    setDateTime(state: SulfurDioxideState, dateTime: string) { state.dateTime = dateTime; },
    setError(state: SulfurDioxideState, error: any) { state.error = error; },
    setIsLoading(state: SulfurDioxideState, isLoading: boolean) { state.isLoading = isLoading; },
    setSulfurDioxide(state: SulfurDioxideState, sulfurDioxide: SulfurDioxide) { state.sulfurDioxide = sulfurDioxide; }
};

const actions: ActionTree<SulfurDioxideState, RootState> = {
    loadSulfurDioxide({ commit, getters }): void {
        commit(mutations.setSulfurDioxide.name, undefined);
        commit(mutations.setError.name, undefined);
        commit(mutations.setIsLoading.name, true);

        const city: City = getters.city;
        const dateTime: string = getters.dateTime;
        const accuracy: number = getters.accuracy;
        const appId: string = getters.openWeatherApiKey;

        openWeatherService
            .loadSulfurDioxide(city, dateTime, accuracy, appId)
            .pipe(
                catchError((error: any) => {
                    commit(mutations.setError.name, error);
                    return of(undefined);
                }),
                take(1)
            )
            .subscribe((sulfurDioxide: SulfurDioxide | undefined) => {
                commit(mutations.setSulfurDioxide.name, sulfurDioxide);
                commit(mutations.setIsLoading.name, false);
            });
    },
    setAccuracy({ commit }, accuracy: number): void {
        commit(mutations.setAccuracy.name, accuracy);
    },
    setDateTime({ commit }, dateTime: string): void {
        commit(mutations.setDateTime.name, dateTime);
    }
};

export const sulfurDioxideModule: Module<SulfurDioxideState, RootState> = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};
