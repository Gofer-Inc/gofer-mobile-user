<template>
  <ion-footer
    :class="spacing ? 'px-4' : ''"
    v-if="show"
    class="ion-no-border bg-white pb-6"
  >
    <ion-toolbar class="px-0 bg-white" color="white">
      <slot />
    </ion-toolbar>
  </ion-footer>
</template>

<script setup>
import { IonFooter, IonToolbar } from "@ionic/vue";
import { Keyboard } from "@capacitor/keyboard";
import { ref } from "vue";

defineProps({
  spacing: {
    type: Boolean,
    default: true,
  },
});
const show = ref(true);

Keyboard.addListener("keyboardWillShow", () => {
  show.value = false;
});

Keyboard.addListener("keyboardDidHide", () => {
  show.value = true;
});
</script>

<style></style>
