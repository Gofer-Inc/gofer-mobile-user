<template>
  <ion-page>
    <gNav :showBackButton="false">
      <div
        class="flex relative items-center justify-between p-2 text-dark-300 py-3"
      >
        <div class="flex flex-col text-base">
          <div
            @click="$router.push({ name: 'Start' })"
            class="text-primary text-xs font-medium flex items-center gap-1"
          >
            <ion-icon class="" color="primary" :icon="chevronBack"></ion-icon>
            <span>Package Delivery </span>
          </div>
        </div>

        <!-- <div
          class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center text-xs gap-1"
        >
          <ion-icon color="secondary" :icon="location"></ion-icon>
          <span class="text-dark-400 font-medium">Yenagoa</span>
          <ion-icon class="" :icon="chevronDown"></ion-icon>
        </div> -->

        <div class="flex items-center gap-3 text-2xl">
          <ion-buttons slot="end">
            <ion-button
              fill="clear"
              class="relative animate__animated animate__rubberBand animate__delay-4s animate__infinite"
            >
              <ion-icon color="primary" :icon="notifications"></ion-icon>
              <div
                class="absolute bg-secondary p-1 rounded-full -right-1 top-1 border-2 border-white"
              ></div>
            </ion-button>
          </ion-buttons>
        </div>
      </div>
    </gNav>
    <ion-content fullscreen>
      <ExploreContainer name="Package Delivery" />
    </ion-content>
  </ion-page>
</template>

<script setup>
import {
  IonPage,
  IonContent,
  IonButtons,
  IonButton,
  IonIcon,
} from "@ionic/vue";
import { chevronBack, notifications } from "ionicons/icons";
import ExploreContainer from "@/components/ExploreContainer.vue";
</script>
