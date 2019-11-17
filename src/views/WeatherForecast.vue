<template>
  <div>
    <v-card class="mx-auto" max-width="344" outlined>
      <v-img
        class="white--text align-end"
        height="200px"
        :src="mostWeatherCondition | wallpaperUrl"
      >
        <v-card-title>{{ mostWeatherCondition | descriptionString}}</v-card-title>
      </v-img>
      <v-card-subtitle class="pb-0">Weather Forecast</v-card-subtitle>
    </v-card>
    <div class="weather-forecase-card-container">
      <v-card class="weather-forecast-card" outlined>
        <v-card-subtitle class="pb-0">Temperature Forecast</v-card-subtitle>
        <v-card-text>
          <v-sheet color="rgba(0, 0, 0, .12)">
            <v-sparkline
              :value="trendTemperature"
              color="rgba(255, 255, 255, .7)"
              height="150"
              padding="24"
              stroke-linecap="round"
              smooth
            ></v-sparkline>
          </v-sheet>
        </v-card-text>
      </v-card>
      <v-card class="weather-forecast-card" outlined>
        <v-card-subtitle class="pb-0">Humidity Forecast</v-card-subtitle>
        <v-card-text>
          <v-sheet color="rgba(0, 0, 0, .12)">
            <v-sparkline
              :value="trendHumidity"
              color="rgba(255, 255, 255, .7)"
              height="150"
              padding="24"
              stroke-linecap="round"
              smooth
            ></v-sparkline>
          </v-sheet>
        </v-card-text>
      </v-card>
      <v-card class="weather-forecast-card" outlined>
        <v-card-subtitle class="pb-0">Pressure Forecast</v-card-subtitle>
        <v-card-text>
          <v-sheet color="rgba(0, 0, 0, .12)">
            <v-sparkline
              :value="trendPressure"
              color="rgba(255, 255, 255, .7)"
              height="150"
              padding="24"
              stroke-linecap="round"
              smooth
            ></v-sparkline>
          </v-sheet>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { IWeatherCondition } from "@/models";

@Component({
  computed: {
    mostWeatherCondition(): IWeatherCondition {
      return this.$store.getters["weatherForecastModule/mostWeatherCondition"];
    },
    trendHumidity(): any[] {
      return this.$store.getters["weatherForecastModule/trendHumidity"];
    },
    trendPressure(): any[] {
      return this.$store.getters["weatherForecastModule/trendPressure"];
    },
    trendTemperature(): any[] {
      return this.$store.getters["weatherForecastModule/trendTemperature"].map(
        (value: any) => value.temp
      );
    }
  },
  filters: {
    descriptionString(weatherCondition: IWeatherCondition) {
      return !!weatherCondition ? weatherCondition.description : "n.a.";
    },
    wallpaperUrl(weatherCondition: IWeatherCondition) {
      return !!weatherCondition
        ? weatherCondition.wallpaper
        : "/assets/weather_wallpaper_dummy.png";
    }
  }
})
export default class WeatherForecastComponent extends Vue {}
</script>

<style lang="scss" scoped>
.weather-forecase-card-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.weather-forecast-card {
  margin: 0.5rem;
  max-width: 344px;
  min-width: 344px;
}
</style>