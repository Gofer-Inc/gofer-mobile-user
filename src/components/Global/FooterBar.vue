<template>
  <ion-footer v-if="show" class="ion-no-border bg-white pb-6 px-4">
    <ion-toolbar class="px-0 bg-white" color="white">
      <slot />
    </ion-toolbar>
  </ion-footer>
</template>

<script setup>
import { IonFooter, IonToolbar } from "@ionic/vue";
import { Keyboard } from "@capacitor/keyboard";
import { ref } from "vue";

const show = ref(true);

Keyboard.addListener("keyboardWillShow", () => {
  show.value = false;
});

Keyboard.addListener("keyboardDidHide", () => {
  show.value = true;
});
</script>

<style></style>
