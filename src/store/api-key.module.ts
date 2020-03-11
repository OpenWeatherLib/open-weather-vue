import { ActionTree, GetterTree, Module, MutationTree } from "vuex";
import { RootState } from "./root-state";

export interface ApiKeyState {
  openWeatherApiKey?: string;
  unsplashApiKey?: string;
}

const state: ApiKeyState = {
  openWeatherApiKey: undefined,
  unsplashApiKey: undefined
};

const getters: GetterTree<ApiKeyState, RootState> = {
  openWeatherApiKey: (state: ApiKeyState) => state.openWeatherApiKey,
  unsplashApiKey: (state: ApiKeyState) => state.unsplashApiKey
};

const mutations: MutationTree<ApiKeyState> = {
  /* eslint-disable */
  setOpenWeatherApiKey(state: ApiKeyState, openWeatherApiKey: string) { state.openWeatherApiKey = openWeatherApiKey; },
  setUnsplashApiKey(state: ApiKeyState, unsplashApiKey: string) { state.unsplashApiKey = unsplashApiKey; }
  /* eslint-enable */
};

const actions: ActionTree<ApiKeyState, RootState> = {
  setOpenWeatherApiKey({ commit }, openWeatherApiKey: string): void {
    commit(mutations.setOpenWeatherApiKey.name, openWeatherApiKey);
  },
  setUnsplashApiKey({ commit }, unsplashApiKey: string): void {
    commit(mutations.setUnsplashApiKey.name, unsplashApiKey);
  }
};

export const apiKeyModule: Module<ApiKeyState, RootState> = {
  namespaced: false,
  state,
  getters,
  mutations,
  actions
};
