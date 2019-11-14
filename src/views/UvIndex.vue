<template>
  <v-card class="mx-auto" max-width="344" outlined>
    <v-list-item three-line>
      <v-list-item-content>
        <div class="overline mb-4">UV Index</div>
        <v-list-item-title class="headline mb-1">{{ uvIndex | valueString }}</v-list-item-title>
        <v-list-item-subtitle>{{ uvIndex | coordinatesString }}</v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-avatar tile size="80" color="primary">
        <v-img src="@/assets/uv_index.png"></v-img>
      </v-list-item-avatar>
    </v-list-item>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { UvIndex } from "@/models";

@Component({
  components: {},
  computed: {
    uvIndex(): UvIndex {
      return this.$store.getters["uvIndexModule/uvIndex"];
    }
  },
  filters: {
    coordinatesString(uvIndex: UvIndex) {
      return !!uvIndex
        ? `Coordinates: Lat: ${uvIndex.lat}, Lon: ${uvIndex.lon}`
        : "n.a.";
    },
    valueString(uvIndex: UvIndex) {
      return !!uvIndex ? uvIndex.value : "n.a.";
    }
  }
})
export default class UvIndexComponent extends Vue {
  constructor() {
    super();
  }
}
</script>

<style lang="scss" scoped>
</style>