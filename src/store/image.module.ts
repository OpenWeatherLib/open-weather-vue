import { of } from "rxjs";
import { catchError, take } from "rxjs/operators";
import { ActionTree, GetterTree, Module, MutationTree } from "vuex";
import { UnsplashImageOrientation } from "@/enums";
import { imageService } from "@/services";
import { RootState } from "./root-state";

export interface ImageState {
    error?: any;
    isLoading?: boolean;
    url?: string;
}

// TODO Remove dummy data
const state: ImageState = {
    error: undefined,
    isLoading: false,
    url: "https://images.unsplash.com/photo-1571838587418-a5f0b80419ba?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjM3MTE5fQ"
};

const getters: GetterTree<ImageState, RootState> = {
    error: (state: ImageState) => state.error,
    isLoading: (state: ImageState) => state.isLoading,
    url: (state: ImageState) => state.url
};

const mutations: MutationTree<ImageState> = {
    setError(state: ImageState, error: any) { state.error = error; },
    setIsLoading(state: ImageState, isLoading: boolean) { state.isLoading = isLoading; },
    setUrl(state: ImageState, url: string) { state.url = url; }
};

const actions: ActionTree<ImageState, RootState> = {
    loadImagePictureUrl({ commit, getters }): void {
        commit(mutations.setUrl.name, undefined);
        commit(mutations.setError.name, undefined);
        commit(mutations.setIsLoading.name, true);

        const clientId: string = getters.unsplashApiKey;
        const cityName: string = getters.city.name;

        imageService
            .loadImagePictureUrl(clientId, cityName, UnsplashImageOrientation.Squarish)
            .pipe(
                catchError((error: any) => {
                    commit(mutations.setError.name, error);
                    return of(undefined);
                }),
                take(1)
            )
            .subscribe((url: string | undefined) => {
                commit(mutations.setUrl.name, url);
                commit(mutations.setIsLoading.name, false);
            });
    },
    setClientId({ commit }, clientId: string): void {
        commit(mutations.setClientId.name, clientId);
    }
};

export const imageModule: Module<ImageState, RootState> = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};
