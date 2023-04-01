<template>
  <div class="flex items-center justify-between my-3">
    <div class="flex items-center gap-1">
      <span class="text-lg font-medium text-dark-300">{{ title }}</span>
      <ion-icon
        v-if="icon"
        class="text-xl"
        :color="iconColor"
        :icon="allIcons[icon]"
      ></ion-icon>
    </div>
    <gButton
      v-if="text"
      @click="
        routeName ? $router.push({ name: routeName }) : $router.push(routePath)
      "
      size="small"
      fill="clear"
      :color="color"
      class="font-medium mx-0"
      >{{ text }}</gButton
    >
  </div>
</template>

<script setup>
import { IonIcon } from "@ionic/vue";
import * as allIcons from "ionicons/icons";
import { addIcons } from "ionicons";
import { onMounted } from "vue";

defineProps({
  color: {
    type: String,
    default: "primary",
  },
  icon: {
    type: [String, Boolean],
    default: false,
  },
  iconColor: {
    type: String,
    default: "secondary",
  },
  title: {
    type: String,
    default: "",
  },
  text: {
    type: [String, Boolean],
    default: false,
  },
  routeName: {
    type: String,
    default: "",
  },

  routePath: {
    type: String,
    default: "",
  },
});

onMounted(() => {
  addIcons(allIcons);
});
</script>

<style></style>
