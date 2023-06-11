<template>
  <ion-app id="app">
    <ion-router-outlet />
    <gToast />
  </ion-app>
</template>

<script setup>
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/keyboard";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/zoom";
import "@ionic/vue/css/ionic-swiper.css";

import { IonApp, IonRouterOutlet } from "@ionic/vue";
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400&family=Poppins:wght@200;400;500;700;800&display=swap");

* {
  font-family: "Poppins", sans-serif;
}

ion-segment.custom {
  border: 1px solid #dfdfdf;
  border-radius: 14px;
  background: #ffffff;
}

ion-segment-button.custom::part(indicator-background) {
  /* background: #08a391; */
  background: var(--ion-color-primary);
}

/* iOS styles */
ion-segment-button.ios.custom::part(native) {
  color: var(--ion-color-primary);
}

.segment-button-checked.ios.custom::part(native) {
  color: #fff;
}

ion-segment-button.ios.custom::part(indicator-background) {
  border-radius: 12px;
}
</style>
