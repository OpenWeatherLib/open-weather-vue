<template>
  <v-card class="mx-auto" max-width="344" outlined>
    <v-img class="white--text align-end" height="200px" :src="weatherCurrent | wallpaperUrl">
      <v-card-title>{{ weatherCurrent | descriptionString}}</v-card-title>
    </v-img>
    <v-card-subtitle class="pb-0">Current Weather</v-card-subtitle>
    <v-card-text class="text--primary">
      <div>{{ weatherCurrent | temperatureString}}</div>
      <div>{{ weatherCurrent | pressureString}}</div>
      <div>{{ weatherCurrent | humidityString}}</div>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { WeatherCurrent } from "@/models";

@Component({
  computed: {
    weatherCurrent(): WeatherCurrent {
      return this.$store.getters["weatherCurrentModule/weatherCurrent"];
    }
  },
  filters: {
    descriptionString(weatherCurrent: WeatherCurrent) {
      return !!weatherCurrent && !!weatherCurrent.weatherCondition
        ? weatherCurrent.weatherCondition.description
        : "n.a.";
    },
    humidityString(weatherCurrent: WeatherCurrent) {
      return !!weatherCurrent && !!weatherCurrent.main
        ? `Humidity: ${weatherCurrent.main.humidity} %`
        : "Humidity: n.a.";
    },
    pressureString(weatherCurrent: WeatherCurrent) {
      return !!weatherCurrent && !!weatherCurrent.main
        ? `Pressure: ${weatherCurrent.main.pressure} mBar`
        : "Pressure: n.a.";
    },
    temperatureString(weatherCurrent: WeatherCurrent) {
      return !!weatherCurrent && !!weatherCurrent.main
        ? `Temperature: ${weatherCurrent.main.temp} °C (${weatherCurrent.main.temp_min}°C - ${weatherCurrent.main.temp_max}°C)`
        : "Temperature: n.a.";
    },
    wallpaperUrl(weatherCurrent: WeatherCurrent) {
      return !!weatherCurrent && !!weatherCurrent.weatherCondition
        ? weatherCurrent.weatherCondition.wallpaper
        : "/assets/weather_wallpaper_dummy.png";
    }
  }
})
export default class WeatherCurrentComponent extends Vue {}
</script>

<style lang="scss" scoped>
</style>