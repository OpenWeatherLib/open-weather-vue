import { of } from "rxjs";
import { catchError, take } from "rxjs/operators";
import { ActionTree, GetterTree, Module, MutationTree } from "vuex";
import { City, Ozone } from "@/models";
import { openWeatherService } from "@/services";
import { RootState } from "./root-state";

export interface OzoneState {
    accuracy?: number;
    dateTime?: string;
    error?: any;
    isLoading?: boolean;
    ozone?: Ozone;
}

const state: OzoneState = {
    accuracy: undefined,
    dateTime: undefined,
    error: undefined,
    isLoading: false,
    ozone: undefined
};

const getters: GetterTree<OzoneState, RootState> = {
    accuracy: (state: OzoneState) => state.accuracy,
    dateTime: (state: OzoneState) => state.dateTime,
    error: (state: OzoneState) => state.error,
    isLoading: (state: OzoneState) => state.isLoading,
    ozone: (state: OzoneState) => state.ozone
};

const mutations: MutationTree<OzoneState> = {
    setAccuracy(state: OzoneState, accuracy: number) { state.accuracy = accuracy; },
    setDateTime(state: OzoneState, dateTime: string) { state.dateTime = dateTime; },
    setError(state: OzoneState, error: any) { state.error = error; },
    setIsLoading(state: OzoneState, isLoading: boolean) { state.isLoading = isLoading; },
    setOzone(state: OzoneState, ozone: Ozone) { state.ozone = ozone; }
};

const actions: ActionTree<OzoneState, RootState> = {
    loadOzone({ commit, getters }): void {
        commit(mutations.setOzone.name, undefined);
        commit(mutations.setError.name, undefined);
        commit(mutations.setIsLoading.name, true);

        const city: City = getters.city;
        const dateTime: string = getters.dateTime;
        const accuracy: number = getters.accuracy;
        const appId: string = getters.openWeatherApiKey;

        openWeatherService
            .loadOzone(city, dateTime, accuracy, appId)
            .pipe(
                catchError((error: any) => {
                    commit(mutations.setError.name, error);
                    return of(undefined);
                }),
                take(1)
            )
            .subscribe((ozone: Ozone | undefined) => {
                commit(mutations.setOzone.name, ozone);
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

export const ozoneModule: Module<OzoneState, RootState> = {
    namespaced: false,
    state,
    getters,
    mutations,
    actions
};
