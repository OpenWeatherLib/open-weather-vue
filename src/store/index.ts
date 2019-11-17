import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";
import { apiKeyModule } from "./api-key.module";
import { carbonMonoxideModule } from "./carbon-monoxide.module";
import { cityModule } from "./city.module";
import { imageModule } from "./image.module";
import { nitrogenDioxideModule } from "./nitrogen-dioxide.module";
import { ozoneModule } from "./ozone.module";
import { RootState } from "./root-state";
import { sulfurDioxideModule } from "./sulfur-dioxide.module";
import { uvIndexModule } from "./uv-index.module";
import { weatherCurrentModule } from "./weather-current.module";

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
  modules: {
    apiKeyModule,
    carbonMonoxideModule,
    cityModule,
    imageModule,
    nitrogenDioxideModule,
    ozoneModule,
    sulfurDioxideModule,
    uvIndexModule,
    weatherCurrentModule
  }
};

export default new Vuex.Store<RootState>(store);
