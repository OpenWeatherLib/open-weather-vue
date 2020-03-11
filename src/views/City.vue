<template>
  <v-card class="mx-auto" max-width="344" outlined>
    <v-img class="white--text align-end" height="200px" :src="wallpaperUrl">
      <v-card-title v-once>{{ city | nameString }}</v-card-title>
    </v-img>
    <v-card-subtitle class="pb-0">City</v-card-subtitle>
    <v-card-text class="text--primary">
      <div v-once>{{ city | countryString }}</div>
      <div v-once>{{ city | populationString }}</div>
      <div v-once>{{ city | coordinatesString }}</div>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { City } from "@/models";

@Component({
  computed: {
    city(): City {
      return this.$store.getters["cityModule/city"];
    },
    wallpaperUrl(): string {
      return this.$store.getters["imageModule/url"];
    }
  },
  filters: {
    coordinatesString(city: City) {
      return !!city && !!city.coord
        ? `Coordinates: Lat: ${city.coord.lat}, Lon: ${city.coord.lon}`
        : "Coordinates: n.a.";
    },
    countryString(city: City) {
      return !!city ? `Country: ${city.country}` : "Country: n.a.";
    },
    nameString(city: City) {
      return !!city ? `${city.name}` : "n.a.";
    },
    populationString(city: City) {
      return !!city ? `Population: ${city.population}` : "Population: n.a.";
    }
  }
})
export default class CityComponent extends Vue {}
</script>
