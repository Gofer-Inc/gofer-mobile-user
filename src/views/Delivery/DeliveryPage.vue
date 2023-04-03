<template>
  <ion-page>
    <ion-header mode="ios" class="bg-white">
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

      <div class="ion-padding flex flex-col gap-4 mb-2">
        <div class="mx-auto w-36 mt-4">
          <img
            src="@/assets/icon/packageIcon.svg"
            alt="Gofer Package Delivery"
            class="w-full mx-auto"
          />
        </div>

        <gButton block color="primary">Track Package</gButton>
      </div>
    </ion-header>
    <ion-content fullscreen class="ion-padding">
      <hr class="mb-2" />
      <div class="flex flex-col gap-6">
        <div>
          <gTitle title="Recent Deliveries" />
          <div class="flex flex-col gap-6 mt-4">
            <PackageCard
              v-for="item in packages"
              :key="item._id"
              :data="item"
            />
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import {
  IonPage,
  IonHeader,
  IonContent,
  IonButtons,
  IonButton,
  IonIcon,
} from "@ionic/vue";
import { chevronBack, notifications } from "ionicons/icons";

import PackageCard from "@/components/Delivery/PackageCard.vue";
import { computed } from "vue";

import packagesDB from "@/utils/packages.js";

const packages = computed(() => packagesDB);
console.log(packages.value);
</script>
