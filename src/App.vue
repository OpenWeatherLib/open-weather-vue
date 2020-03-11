<template>
  <v-app>
    <v-app-bar app clipped-left color="primary" dark dense>
      <v-toolbar-title>Open Weather</v-toolbar-title>
      <v-spacer />

      <template v-slot:extension>
        <!-- eslint-disable -->
        <v-tabs center-active centered color="secondary" icons-and-text show-arrows v-model="tab">
          <AvatarTab name="Carbon Monoxide" src="/assets/carbon_monoxide.png" />
          <AvatarTab name="City" src="/assets/city.svg" />
          <AvatarTab name="Current Weather" src="/assets/weather_dummy.png" />
          <AvatarTab name="Nitrogen Dioxide" src="/assets/nitrogen_dioxide.png" />
          <AvatarTab name="Ozone" src="/assets/ozone.png" />
          <AvatarTab name="Sulfur Dioxide" src="/assets/sulfur_dioxide.png" />
          <AvatarTab name="Uv Index" src="/assets/uv_index.png" />
          <AvatarTab name="Weather Forecast" src="/assets/weather_dummy.png" />
        </v-tabs>
        <!-- eslint-enable -->
      </template>
    </v-app-bar>

    <v-content class="ma-1">
      <v-card class="ma-auto elevation-8" style="height: 80vh; width: 80vw;">
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

    <v-footer app color="accent">
      <v-switch
        :label="$vuetify.theme.dark ? 'Dark theme' : 'Light theme'"
        class="ma-0"
        dense
        hide-details
        v-model="$vuetify.theme.dark"
      ></v-switch>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import AvatarTab from "@/controls/AvatarTab.vue";
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
    AvatarTab,
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
