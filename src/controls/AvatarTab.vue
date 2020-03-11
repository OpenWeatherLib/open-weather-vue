<template>
  <v-tab :key="name">
    <div v-text="name"></div>
    <v-avatar color="secondary" size="24">
      <img :alt="name" :src="src" />
    </v-avatar>
  </v-tab>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({
  name: "avatar-tab",
  props: {
    name: {
      default: "",
      required: true,
      type: String
    },
    src: {
      default: "",
      required: true,
      type: String
    }
  }
})
export default class AvatarTab extends Vue {}
</script>
