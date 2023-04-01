<template>
  <ion-app id="app">
    <ion-router-outlet />
  </ion-app>
</template>

<script setup>
import { IonApp, IonRouterOutlet } from "@ionic/vue";
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400&family=Poppins:wght@200;400;500;700;800&display=swap");

/* @font-face {
  font-family: "Aeonik";
  src: url("@/assets/fonts/AeonikTRIAL-Regular.otf") format("truetype");
  font-weight: normal;
  font-style: normal;
} */

* {
  font-family: "Poppins", sans-serif;
}
</style>
