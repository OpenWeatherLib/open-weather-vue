import { of } from "rxjs";
import { catchError, take } from "rxjs/operators";
import { ActionTree, GetterTree, Module, MutationTree } from "vuex";
import { City } from "@/models";
import { cityService } from "@/services";
import { RootState } from "./root-state";

export interface CityState {
    city?: City;
    error?: any;
    isLoading?: boolean;
}

const state: CityState = {
    city: undefined,
    error: undefined,
    isLoading: false
};

const getters: GetterTree<CityState, RootState> = {
    city: (state: CityState) => state.city,
    error: (state: CityState) => state.error,
    isLoading: (state: CityState) => state.isLoading
};

const mutations: MutationTree<CityState> = {
    setCity(state: CityState, city: City) { state.city = city; },
    setError(state: CityState, error: any) { state.error = error; },
    setIsLoading(state: CityState, isLoading: boolean) { state.isLoading = isLoading; }
};

const actions: ActionTree<CityState, RootState> = {
    loadCityData({ commit }, cityName: string): void {
        commit(mutations.setCity.name, undefined);
        commit(mutations.setError.name, undefined);
        commit(mutations.setIsLoading.name, true);

        cityService
            .loadCityData(cityName)
            .pipe(
                catchError((error: any) => {
                    commit(mutations.setError.name, error);
                    return of(undefined);
                }),
                take(1)
            )
            .subscribe((city: City | undefined) => {
                commit(mutations.setCity.name, city);
                commit(mutations.setIsLoading.name, false);
            });
    }
};

export const cityModule: Module<CityState, RootState> = {
    namespaced: false,
    state,
    getters,
    mutations,
    actions
};
