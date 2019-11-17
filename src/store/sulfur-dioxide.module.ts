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

// TODO Remove dummy data
const state: SulfurDioxideState = {
    accuracy: 2,
    dateTime: "Sun Nov 17 13:46:38 2019 UTC",
    error: undefined,
    isLoading: false,
    sulfurDioxide: {
        dateTime: new Date("Sun Nov 17 13:46:38 2019 UTC"),
        coordinates: {
            longitude: 11.083333,
            latitude: 49.45
        },
        data: [
            {
                precision: -9.99999993922529e-9,
                pressure: 1000,
                value: 0
            },
            {
                precision: -9.99999993922529e-9,
                pressure: 681.2920532226562,
                value: 0
            },
            {
                precision: -9.99999993922529e-9,
                pressure: 464.15887451171875,
                value: 0
            },
            {
                precision: -9.621517804703217e-9,
                pressure: 316.2277526855469,
                value: 2.397906762041657e-9
            },
            {
                precision: 4.573119660733482e-9,
                pressure: 215.44346618652344,
                value: -4.405438236432246e-9
            },
            {
                precision: 3.3010516542475443e-9,
                pressure: 146.77992248535156,
                value: 5.403124059277786e-10
            },
            {
                precision: 3.409844184787403e-9,
                pressure: 100,
                value: 7.005114821545533e-10
            },
            {
                precision: 2.955490074896261e-9,
                pressure: 68.12920379638672,
                value: -1.1165012026026488e-8
            },
            {
                precision: 3.736170040014031e-9,
                pressure: 46.415889739990234,
                value: 1.5617569459891456e-8
            },
            {
                precision: 3.0040765430783267e-9,
                pressure: 31.62277603149414,
                value: -8.578512122880966e-9
            },
            {
                precision: 3.903429579565909e-9,
                pressure: 21.544347763061523,
                value: -6.5094281076483185e-9
            },
            {
                precision: 4.837968248239122e-9,
                pressure: 14.677992820739746,
                value: 5.96181148893038e-9
            },
            {
                precision: -5.1170889747709225e-9,
                pressure: 10,
                value: -8.251324956631834e-9
            },
            {
                precision: -6.7433001404992865e-9,
                pressure: 6.812920570373535,
                value: 4.585771762322111e-9
            },
            {
                precision: -7.020914960520486e-9,
                pressure: 4.6415886878967285,
                value: 4.773792472434479e-9
            },
            {
                precision: -7.615595265519914e-9,
                pressure: 3.1622776985168457,
                value: -5.424107385465504e-9
            },
            {
                precision: -8.176098020840072e-9,
                pressure: 2.1544346809387207,
                value: 2.7619506681730854e-9
            },
            {
                precision: -8.664033934735471e-9,
                pressure: 1.4677993059158325,
                value: 6.522177908863114e-9
            },
            {
                precision: -9.016179802756596e-9,
                pressure: 1,
                value: -1.5505902117851633e-10
            },
            {
                precision: -9.99999993922529e-9,
                pressure: 0.6812920570373535,
                value: 0
            },
            {
                precision: -9.99999993922529e-9,
                pressure: 0.46415889263153076,
                value: 0
            },
            {
                precision: -9.99999993922529e-9,
                pressure: 0.3162277638912201,
                value: 0
            },
            {
                precision: -9.99999993922529e-9,
                pressure: 0.2154434621334076,
                value: 0
            },
            {
                precision: -9.99999993922529e-9,
                pressure: 0.14677992463111877,
                value: 0
            },
            {
                precision: -9.99999993922529e-9,
                pressure: 0.10000000149011612,
                value: 0
            },
            {
                precision: -9.99999993922529e-9,
                pressure: 0.04641588777303696,
                value: 0
            },
            {
                precision: -9.99999993922529e-9,
                pressure: 0.02154434658586979,
                value: 0
            },
            {
                precision: -9.99999993922529e-9,
                pressure: 0.009999999776482582,
                value: 0
            },
            {
                precision: -9.99999993922529e-9,
                pressure: 0.004641588777303696,
                value: 0
            },
            {
                precision: -9.99999993922529e-9,
                pressure: 0.002154434798285365,
                value: 0
            },
            {
                precision: -9.99999993922529e-9,
                pressure: 0.0010000000474974513,
                value: 0
            },
            {
                precision: -9.99999993922529e-9,
                pressure: 0.00046415888937190175,
                value: 0
            },
            {
                precision: -9.99999993922529e-9,
                pressure: 0.00021544346236623824,
                value: 0
            },
            {
                precision: -9.99999993922529e-9,
                pressure: 0.00009999999747378752,
                value: 0
            },
            {
                precision: -9.99999993922529e-9,
                pressure: 0.00004641588748199865,
                value: 0
            },
            {
                precision: -9.99999993922529e-9,
                pressure: 0.000021544346964219585,
                value: 0
            },
            {
                precision: -9.99999993922529e-9,
                pressure: 0.000009999999747378752,
                value: 0
            }
        ]
    }
};

const getters: GetterTree<SulfurDioxideState, RootState> = {
    accuracy: (state: SulfurDioxideState) => state.accuracy,
    dateTime: (state: SulfurDioxideState) => state.dateTime,
    error: (state: SulfurDioxideState) => state.error,
    isLoading: (state: SulfurDioxideState) => state.isLoading,
    sulfurDioxide: (state: SulfurDioxideState) => state.sulfurDioxide,
    sulfurDioxideData: (state: SulfurDioxideState) => !!state.sulfurDioxide ? state.sulfurDioxide.data : []
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
