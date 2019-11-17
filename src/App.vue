<template>
  <v-app>
    <v-content style="margin: 0.5rem;">
      <v-card style="height: calc(100vh - 1rem);">
        <v-card-title class="text-center justify-center py-6">
          <h1 class="font-weight-bold display-3 basil--text">OpenWeather</h1>
        </v-card-title>

        <v-tabs v-model="tab" background-color="deep-purple accent-4" center-active dark>
          <v-tab key="carbon-monoxide">Carbon Monoxide</v-tab>
          <v-tab key="city">City</v-tab>
          <v-tab key="weather-current">Current Weather</v-tab>
          <v-tab key="nitrogen-dioxide">Nitrogen Dioxide</v-tab>
          <v-tab key="ozone">Ozone</v-tab>
          <v-tab key="sulfur-dioxide">Sulfur Dioxide</v-tab>
          <v-tab key="uv-index">Uv Index</v-tab>
          <v-tab key="weather-forecast">Weather Forecast</v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
          <v-container class="fill-height" fluid>
            <v-row align="center" justify="center">
              <v-col cols="12" sm="8" :md="tab | mdCalc">
                <v-tab-item key="carbon-monoxide">
                  <CarbonMonoxideComponent />
                </v-tab-item>
                <v-tab-item key="city">
                  <CityComponent />
                </v-tab-item>
                <v-tab-item key="weather-current">
                  <WeatherCurrentComponent />
                </v-tab-item>
                <v-tab-item key="nitrogen-dioxide">
                  <NitrogenDioxideComponent />
                </v-tab-item>
                <v-tab-item key="ozone">
                  <OzoneComponent />
                </v-tab-item>
                <v-tab-item key="sulfur-dioxide">
                  <SulfurDioxideComponent />
                </v-tab-item>
                <v-tab-item key="uv-index">
                  <UvIndexComponent />
                </v-tab-item>
                <v-tab-item key="weather forecast">
                  <WeatherForecastComponent />
                </v-tab-item>
              </v-col>
            </v-row>
          </v-container>
        </v-tabs-items>
      </v-card>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import CarbonMonoxideComponent from "@/views/CarbonMonoxide.vue";
import CityComponent from "@/views/City.vue";
import NitrogenDioxideComponent from "@/views/NitrogenDioxide.vue";
import OzoneComponent from "@/views/Ozone.vue";
import SulfurDioxideComponent from "@/views/SulfurDioxide.vue";
import UvIndexComponent from "@/views/UvIndex.vue";
import WeatherCurrentComponent from "@/views/WeatherCurrent.vue";
import WeatherForecastComponent from "@/views/WeatherForecast.vue";

@Component({
  components: {
    CarbonMonoxideComponent,
    CityComponent,
    NitrogenDioxideComponent,
    OzoneComponent,
    SulfurDioxideComponent,
    UvIndexComponent,
    WeatherCurrentComponent,
    WeatherForecastComponent
  },
  data: () => ({
    tab: 2
  }),
  filters: {
    mdCalc(tab: number) {
      return tab === 7 ? 12 : 4;
    }
  }
})
export default class App extends Vue {
  constructor() {
    super();
  }
}
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
