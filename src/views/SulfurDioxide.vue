<template>
  <v-card class="mx-auto" max-width="344" outlined>
    <v-list-item three-line>
      <v-list-item-content>
        <div class="overline mb-4">Sulfur Dioxide</div>
        <v-list-item-subtitle>{{ sulfurDioxide | coordinatesString }}</v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-avatar tile size="80" color="primary">
        <v-img src="/assets/sulfur_dioxide.png"></v-img>
      </v-list-item-avatar>
    </v-list-item>

    <v-card-text>
      <v-sheet color="rgba(0, 0, 0, .12)">
        <v-sparkline
          :value="sulfurDioxideData"
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
import { SulfurDioxide, SulfurDioxideData } from "@/models";

@Component({
  computed: {
    sulfurDioxide(): SulfurDioxide {
      return this.$store.getters["sulfurDioxideModule/sulfurDioxide"];
    },
    sulfurDioxideData(): SulfurDioxideData[] {
      return this.$store.getters["sulfurDioxideModule/sulfurDioxideData"];
    }
  },
  filters: {
    coordinatesString(sulfurDioxide: SulfurDioxide) {
      return !!sulfurDioxide && !!sulfurDioxide.coordinates
        ? `Coordinates: Lat: ${sulfurDioxide.coordinates.latitude}, Lon: ${sulfurDioxide.coordinates.longitude}`
        : "Coordinates: n.a.";
    }
  }
})
export default class SulfurDioxideComponent extends Vue {}
</script>

<style lang="scss" scoped>
</style>