<template>
  <v-card class="mx-auto" max-width="344" outlined>
    <v-list-item three-line>
      <v-list-item-content>
        <div class="overline mb-4">Nitrogen Dioxide</div>
        <v-list-item-subtitle v-once>
          {{ nitrogenDioxide | coordinatesString }}
        </v-list-item-subtitle>
        <div class="overline mb-6"></div>
        <v-list-item-title v-once>
          {{ nitrogenDioxide | valueString }}
        </v-list-item-title>
        <div class="overline mb-6">Value</div>
        <v-list-item-title v-once>
          {{ nitrogenDioxide | precisionString }}
        </v-list-item-title>
        <div class="overline mb-6">Precision</div>
        <v-list-item-title v-once>
          {{ nitrogenDioxide | valueStratString }}
        </v-list-item-title>
        <div class="overline mb-6">Value (Strat)</div>
        <v-list-item-title v-once>
          {{ nitrogenDioxide | precisionStratString }}
        </v-list-item-title>
        <div class="overline mb-6">Precision (Strat)</div>
        <v-list-item-title v-once>
          {{ nitrogenDioxide | valueTropString }}
        </v-list-item-title>
        <div class="overline mb-6">Value (Trop)</div>
        <v-list-item-title v-once>
          {{ nitrogenDioxide | precisionTropString }}
        </v-list-item-title>
        <div class="overline mb-6">Precision (Trop)</div>
      </v-list-item-content>

      <v-list-item-avatar tile size="80" color="primary">
        <v-img src="/assets/nitrogen_dioxide.png"></v-img>
      </v-list-item-avatar>
    </v-list-item>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { NitrogenDioxide } from "@/models";

@Component({
  computed: {
    nitrogenDioxide(): NitrogenDioxide {
      return this.$store.getters["nitrogenDioxideModule/nitrogenDioxide"];
    }
  },
  filters: {
    coordinatesString(nitrogenDioxide: NitrogenDioxide) {
      return !!nitrogenDioxide && !!nitrogenDioxide.coordinates
        ? `Coordinates: Lat: ${nitrogenDioxide.coordinates.latitude}, Lon: ${nitrogenDioxide.coordinates.longitude}`
        : "Coordinates: n.a.";
    },
    precisionStratString(nitrogenDioxide: NitrogenDioxide) {
      return !!nitrogenDioxide && !!nitrogenDioxide.data
        ? `${nitrogenDioxide.data.no2_strat.precision}`
        : "n.a.";
    },
    precisionString(nitrogenDioxide: NitrogenDioxide) {
      return !!nitrogenDioxide && !!nitrogenDioxide.data
        ? `${nitrogenDioxide.data.no2.precision}`
        : "n.a.";
    },
    precisionTropString(nitrogenDioxide: NitrogenDioxide) {
      return !!nitrogenDioxide && !!nitrogenDioxide.data
        ? `${nitrogenDioxide.data.no2_trop.precision}`
        : "n.a.";
    },
    valueStratString(nitrogenDioxide: NitrogenDioxide) {
      return !!nitrogenDioxide && !!nitrogenDioxide.data
        ? `${nitrogenDioxide.data.no2_strat.value}`
        : "n.a.";
    },
    valueString(nitrogenDioxide: NitrogenDioxide) {
      return !!nitrogenDioxide && !!nitrogenDioxide.data
        ? `${nitrogenDioxide.data.no2.value}`
        : "n.a.";
    },
    valueTropString(nitrogenDioxide: NitrogenDioxide) {
      return !!nitrogenDioxide && !!nitrogenDioxide.data
        ? `${nitrogenDioxide.data.no2_trop.value}`
        : "n.a.";
    }
  }
})
export default class NitrogenDioxideComponent extends Vue {}
</script>
