<template>
  <v-app>
    <v-content style="margin: 0.5rem;">
      <v-card style="height: calc(100vh - 1rem);">
        <v-card-title class="text-center justify-center py-6">
          <h1 class="font-weight-bold display-3 basil--text">OpenWeather</h1>
        </v-card-title>

        <v-tabs v-model="tab" background-color="deep-purple accent-4" center-active dark>
          <v-tab key="uv-index">UvIndex</v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
          <v-container class="fill-height" fluid>
            <v-row align="center" justify="center">
              <v-col cols="12" sm="8" md="4">
                <v-tab-item key="uv-index">
                  <UvIndexComponent />
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
import UvIndexComponent from "@/views/UvIndex.vue";

@Component({
  components: { UvIndexComponent },
  data: () => ({
    tab: "uv-index"
  })
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
