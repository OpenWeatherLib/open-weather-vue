<template>
  <v-card class="mx-auto" max-width="344" outlined>
    <v-list-item three-line>
      <v-list-item-content>
        <div class="overline mb-4">Carbon Monoxide</div>
        <v-list-item-subtitle>{{ carbonMonoxide | coordinatesString }}</v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-avatar tile size="80" color="primary">
        <v-img src="/assets/carbon_monoxide.png"></v-img>
      </v-list-item-avatar>
    </v-list-item>

    <v-card-text>
      <v-sheet color="rgba(0, 0, 0, .12)">
        <v-sparkline
          :value="carbonMonoxideData"
          color="rgba(255, 255, 255, .7)"
          height="150"
          padding="24"
          stroke-linecap="round"
          smooth
        ></v-sparkline>
      </v-sheet>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { CarbonMonoxide, CarbonMonoxideData } from "@/models";

@Component({
  computed: {
    carbonMonoxide(): CarbonMonoxide {
      return this.$store.getters["carbonMonoxideModule/carbonMonoxide"];
    },
    carbonMonoxideData(): CarbonMonoxideData[] {
      return this.$store.getters["carbonMonoxideModule/carbonMonoxideData"];
    }
  },
  filters: {
    coordinatesString(carbonMonoxide: CarbonMonoxide) {
      return !!carbonMonoxide && !!carbonMonoxide.coordinates
        ? `Coordinates: Lat: ${carbonMonoxide.coordinates.latitude}, Lon: ${carbonMonoxide.coordinates.longitude}`
        : "Coordinates: n.a.";
    }
  }
})
export default class CarbonMonoxideComponent extends Vue {}
</script>

<style lang="scss" scoped>
</style>