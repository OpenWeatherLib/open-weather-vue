import { of } from "rxjs";
import { catchError, take } from "rxjs/operators";
import { ActionTree, GetterTree, Module, MutationTree } from "vuex";
import { CarbonMonoxide, City } from "@/models";
import { openWeatherService } from "@/services";
import { RootState } from "./root-state";

export interface CarbonMonoxideState {
    accuracy?: number;
    carbonMonoxide?: CarbonMonoxide;
    dateTime?: string;
    error?: any;
    isLoading?: boolean;
}

const state: CarbonMonoxideState = {
    accuracy: undefined,
    carbonMonoxide: undefined,
    dateTime: undefined,
    error: undefined,
    isLoading: false
};

const getters: GetterTree<CarbonMonoxideState, RootState> = {
    accuracy: (state: CarbonMonoxideState) => state.accuracy,
    carbonMonoxide: (state: CarbonMonoxideState) => state.carbonMonoxide,
    dateTime: (state: CarbonMonoxideState) => state.dateTime,
    error: (state: CarbonMonoxideState) => state.error,
    isLoading: (state: CarbonMonoxideState) => state.isLoading
};

const mutations: MutationTree<CarbonMonoxideState> = {
    setAccuracy(state: CarbonMonoxideState, accuracy: number) { state.accuracy = accuracy; },
    setCarbonMonoxide(state: CarbonMonoxideState, carbonMonoxide: CarbonMonoxide) { state.carbonMonoxide = carbonMonoxide; },
    setDateTime(state: CarbonMonoxideState, dateTime: string) { state.dateTime = dateTime; },
    setError(state: CarbonMonoxideState, error: any) { state.error = error; },
    setIsLoading(state: CarbonMonoxideState, isLoading: boolean) { state.isLoading = isLoading; }
};

const actions: ActionTree<CarbonMonoxideState, RootState> = {
    loadCarbonMonoxide({ commit, getters }): void {
        commit(mutations.setCarbonMonoxide.name, undefined);
        commit(mutations.setError.name, undefined);
        commit(mutations.setIsLoading.name, true);

        const city: City = getters.city;
        const dateTime: string = getters.dateTime;
        const accuracy: number = getters.accuracy;
        const appId: string = getters.openWeatherApiKey;

        openWeatherService
            .loadCarbonMonoxide(city, dateTime, accuracy, appId)
            .pipe(
                catchError((error: any) => {
                    commit(mutations.setError.name, error);
                    return of(undefined);
                }),
                take(1)
            )
            .subscribe((carbonMonoxide: CarbonMonoxide | undefined) => {
                commit(mutations.setCarbonMonoxide.name, carbonMonoxide);
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

export const carbonMonoxideModule: Module<CarbonMonoxideState, RootState> = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};
