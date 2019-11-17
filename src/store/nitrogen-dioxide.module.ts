import { of } from "rxjs";
import { catchError, take } from "rxjs/operators";
import { ActionTree, GetterTree, Module, MutationTree } from "vuex";
import { City, NitrogenDioxide } from "@/models";
import { openWeatherService } from "@/services";
import { RootState } from "./root-state";

export interface NitrogenDioxideState {
    accuracy?: number;
    dateTime?: string;
    error?: any;
    isLoading?: boolean;
    nitrogenDioxide?: NitrogenDioxide;
}

// TODO Remove dummy data
const state: NitrogenDioxideState = {
    accuracy: 2,
    dateTime: "Sun Nov 17 13:46:38 2019 UTC",
    error: undefined,
    isLoading: false,
    nitrogenDioxide: {
        dateTime: new Date("Sun Nov 17 13:46:38 2019 UTC"),
        coordinates: {
            longitude: 11.083333,
            latitude: 49.45
        },
        data: {
            no2: {
                precision: 1.436401748934656e+15,
                value: 2.550915831693312e+15
            },
            no2_strat: {
                precision: 2.00000000753664e+14,
                value: 1.780239650783232e+15
            },
            no2_trop: {
                precision: 1.464945698930688e+15,
                value: 7.7067618091008e+14
            }
        }
    }
};

const getters: GetterTree<NitrogenDioxideState, RootState> = {
    accuracy: (state: NitrogenDioxideState) => state.accuracy,
    dateTime: (state: NitrogenDioxideState) => state.dateTime,
    error: (state: NitrogenDioxideState) => state.error,
    isLoading: (state: NitrogenDioxideState) => state.isLoading,
    nitrogenDioxide: (state: NitrogenDioxideState) => state.nitrogenDioxide
};

const mutations: MutationTree<NitrogenDioxideState> = {
    setAccuracy(state: NitrogenDioxideState, accuracy: number) { state.accuracy = accuracy; },
    setDateTime(state: NitrogenDioxideState, dateTime: string) { state.dateTime = dateTime; },
    setError(state: NitrogenDioxideState, error: any) { state.error = error; },
    setIsLoading(state: NitrogenDioxideState, isLoading: boolean) { state.isLoading = isLoading; },
    setNitrogenDioxide(state: NitrogenDioxideState, nitrogenDioxide: NitrogenDioxide) { state.nitrogenDioxide = nitrogenDioxide; }
};

const actions: ActionTree<NitrogenDioxideState, RootState> = {
    loadNitrogenDioxide({ commit, getters }): void {
        commit(mutations.setNitrogenDioxide.name, undefined);
        commit(mutations.setError.name, undefined);
        commit(mutations.setIsLoading.name, true);

        const city: City = getters.city;
        const dateTime: string = getters.dateTime;
        const accuracy: number = getters.accuracy;
        const appId: string = getters.openWeatherApiKey;

        openWeatherService
            .loadNitrogenDioxide(city, dateTime, accuracy, appId)
            .pipe(
                catchError((error: any) => {
                    commit(mutations.setError.name, error);
                    return of(undefined);
                }),
                take(1)
            )
            .subscribe((nitrogenDioxide: NitrogenDioxide | undefined) => {
                commit(mutations.setNitrogenDioxide.name, nitrogenDioxide);
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

export const nitrogenDioxideModule: Module<NitrogenDioxideState, RootState> = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};
