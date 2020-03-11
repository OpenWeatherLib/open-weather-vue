<template>
  <v-card class="mx-auto" max-width="344" outlined>
    <v-list-item three-line>
      <v-list-item-content>
        <div class="overline mb-4">Ozone</div>
        <v-list-item-title class="headline mb-1" v-once>
          {{ ozone | valueString }}
        </v-list-item-title>
        <v-list-item-subtitle v-once>
          {{ ozone | coordinatesString }}
        </v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-avatar tile size="80" color="primary">
        <v-img src="/assets/ozone.png"></v-img>
      </v-list-item-avatar>
    </v-list-item>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Ozone } from "@/models";

@Component({
  computed: {
    ozone(): Ozone {
      return this.$store.getters["ozoneModule/ozone"];
    }
  },
  filters: {
    coordinatesString(ozone: Ozone) {
      return !!ozone && !!ozone.coordinates
        ? `Coordinates: Lat: ${ozone.coordinates.latitude}, Lon: ${ozone.coordinates.longitude}`
        : "Coordinates: n.a.";
    },
    valueString(ozone: Ozone) {
      return !!ozone ? ozone.data : "n.a.";
    }
  }
})
export default class OzoneComponent extends Vue {}
</script>
