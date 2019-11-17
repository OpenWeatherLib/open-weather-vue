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

// TODO Remove dummy data
const state: CarbonMonoxideState = {
    accuracy: 2,
    carbonMonoxide: {
        dateTime: new Date("Sun Nov 17 13:46:38 2019 UTC"),
        coordinates: {
            longitude: 11.083333,
            latitude: 49.45
        },
        data: [
            {
                precision: -4.999999987376214e-7,
                pressure: 1000,
                value: 8.168363052618588e-8
            },
            {
                precision: -4.999999987376214e-7,
                pressure: 681.2920532226562,
                value: 8.686949115599418e-8
            },
            {
                precision: -4.999999987376214e-7,
                pressure: 464.15887451171875,
                value: 8.871462853221601e-8
            },
            {
                precision: 4.933803054996133e-8,
                pressure: 316.2277526855469,
                value: 1.6002368852241489e-7
            },
            {
                precision: 2.3253464931372037e-8,
                pressure: 215.44346618652344,
                value: 1.4021857452917175e-7
            },
            {
                precision: 1.3912860197251575e-8,
                pressure: 146.77992248535156,
                value: 1.1667933108583384e-7
            },
            {
                precision: 1.1896506002528895e-8,
                pressure: 100,
                value: 7.605407148503218e-8
            },
            {
                precision: 1.0380049708658134e-8,
                pressure: 68.12920379638672,
                value: 2.3504805213292457e-8
            },
            {
                precision: 8.774787119136818e-9,
                pressure: 46.415889739990234,
                value: 1.4652969504425073e-8
            },
            {
                precision: 9.064216044407658e-9,
                pressure: 31.62277603149414,
                value: -8.553522334864283e-9
            },
            {
                precision: 9.907495268635103e-9,
                pressure: 21.544347763061523,
                value: -2.173847413189378e-8
            },
            {
                precision: 1.2558795781103527e-8,
                pressure: 14.677992820739746,
                value: 7.51443174351607e-9
            },
            {
                precision: 1.561764761959239e-8,
                pressure: 10,
                value: 3.798272274480041e-8
            },
            {
                precision: 2.201712767657682e-8,
                pressure: 6.812920570373535,
                value: 2.116530062323818e-8
            },
            {
                precision: 2.9614307450742672e-8,
                pressure: 4.6415886878967285,
                value: 5.3422418488935364e-8
            },
            {
                precision: 3.931098291332091e-8,
                pressure: 3.1622776985168457,
                value: 9.680208634677001e-9
            },
            {
                precision: 5.495197896721038e-8,
                pressure: 2.1544346809387207,
                value: 3.453592256619231e-8
            },
            {
                precision: 7.35018517161734e-8,
                pressure: 1.4677993059158325,
                value: 6.484519587957038e-8
            },
            {
                precision: 9.874914752572295e-8,
                pressure: 1,
                value: 3.8202539798248836e-8
            },
            {
                precision: 1.4814123971973459e-7,
                pressure: 0.6812920570373535,
                value: 9.366933539922684e-8
            },
            {
                precision: 2.1034971098288224e-7,
                pressure: 0.46415889263153076,
                value: -7.530982770731498e-8
            },
            {
                precision: 2.9519043209802476e-7,
                pressure: 0.3162277638912201,
                value: 1.2717306674403517e-7
            },
            {
                precision: 4.3796805471174594e-7,
                pressure: 0.2154434621334076,
                value: 1.7876864433219453e-8
            },
            {
                precision: 6.393275953087141e-7,
                pressure: 0.14677992463111877,
                value: -6.017871090335802e-9
            },
            {
                precision: 7.225509079944459e-7,
                pressure: 0.10000000149011612,
                value: -6.440906190618989e-7
            },
            {
                precision: 0.0000010257764415655402,
                pressure: 0.04641588777303696,
                value: 0.0000028605852548935218
            },
            {
                precision: 0.0000019069242398472852,
                pressure: 0.02154434658586979,
                value: 0.000001442174834664911
            },
            {
                precision: 0.0000038950297494011465,
                pressure: 0.009999999776482582,
                value: 0.000009470278200751636
            },
            {
                precision: -0.0000068988306338724215,
                pressure: 0.004641588777303696,
                value: 0.000013758944987785071
            },
            {
                precision: -0.000010580090020084754,
                pressure: 0.002154434798285365,
                value: 0.00003746932270587422
            },
            {
                precision: -0.0000164121956913732,
                pressure: 0.0010000000474974513,
                value: 0.00004444898877409287
            },
            {
                precision: -0.000019999999494757503,
                pressure: 0.00046415888937190175,
                value: 0.000019254461221862584
            },
            {
                precision: -0.000019999999494757503,
                pressure: 0.00021544346236623824,
                value: 0.000019254461221862584
            },
            {
                precision: -0.000019999999494757503,
                pressure: 0.00009999999747378752,
                value: 0.000019254461221862584
            },
            {
                precision: -0.000019999999494757503,
                pressure: 0.00004641588748199865,
                value: 0.000019254461221862584
            },
            {
                precision: -0.000019999999494757503,
                pressure: 0.000021544346964219585,
                value: 0.000019254461221862584
            },
            {
                precision: -0.000019999999494757503,
                pressure: 0.000009999999747378752,
                value: 0.000019254461221862584
            }
        ]
    },
    dateTime: "Sun Nov 17 13:46:38 2019 UTC",
    error: undefined,
    isLoading: false
};

const getters: GetterTree<CarbonMonoxideState, RootState> = {
    accuracy: (state: CarbonMonoxideState) => state.accuracy,
    carbonMonoxide: (state: CarbonMonoxideState) => state.carbonMonoxide,
    carbonMonoxideData: (state: CarbonMonoxideState) => !!state.carbonMonoxide ? state.carbonMonoxide.data : [],
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
