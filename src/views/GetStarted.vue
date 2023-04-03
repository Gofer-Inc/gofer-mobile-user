<template>
  <ion-page>
    <gNav :showBackButton="false" borderless color="transparent">
      <div class="flex items-center justify-between p-2 text-dark-300 py-3">
        <div class="flex flex-col text-base w-10">
          <img src="@/assets/icon/gofer-skin.svg" alt="" />
        </div>

        <div class="flex items-center text-xs gap-1">
          <!-- <ion-icon class="text-white" :icon="location"></ion-icon> -->
          <span class="text-white font-medium">Gofer</span>
          <!-- <ion-icon class="text-white" :icon="chevronDown"></ion-icon> -->
        </div>

        <div class="flex items-center gap-3 text-2xl">
          <ion-buttons slot="end">
            <ion-button
              fill="clear"
              class="relative animate__animated animate__rubberBand animate__delay-4s animate__infinite"
            >
              <ion-icon class="text-white" :icon="gift"></ion-icon>
              <div
                class="absolute bg-secondary p-1 rounded-full -right-1 top-1 border-2 border-white"
              ></div>
            </ion-button>
          </ion-buttons>
        </div>
      </div>
    </gNav>
    <ion-content fullscreen color="primary" class="ion-padding">
      <div
        class="grid grid-cols-2 gap-4 place-content-center justify-item-center mt-20"
      >
        <div
          v-for="(service, i) in services"
          @click="closeModal(), $router.push({ name: service.route })"
          :key="i"
          style="box-shadow: 6px 6px 24px 2px rgba(0, 0, 0, 0.1)"
          :class="`${i == 1 ? 'mt-24 animate__delay-2s' : ''} `"
          class="max-w-full mx-auto w-52 sm:w-10/12 h-64 bg-white rounded-3xl ion-padding flex flex-col gap-6 animate__animated animate__pulse animate__slower animate__infinite"
        >
          <div :class="i == 1 ? 'w-11/12' : 'w-10/12'" class="mx-auto h-full">
            <img
              :src="service.logo"
              :alt="service.title"
              class="h-full mx-auto"
            />
          </div>
          <div class="text-xl sm:text-2xl font-medium text-dark-300 leading-7">
            {{ service.title }}
          </div>
        </div>
      </div>
    </ion-content>

    <gModal
      @close="isOpen = false"
      :isOpen="isOpen"
      type="sheet"
      :backdropDismiss="false"
      :breakPoints="[0, 0.25, 0.5, 0.7, 0.9, 1]"
      :initialBreakpoint="0.25"
      :canDismiss="canDismiss"
    >
      <NearYou class="mt-4" @close="closeModal" />
    </gModal>
  </ion-page>
</template>

<script setup>
import {
  IonPage,
  IonContent,
  IonButtons,
  IonButton,
  IonIcon,
  onIonViewWillEnter,
} from "@ionic/vue";
import { gift } from "ionicons/icons";

import storeLogo from "@/assets/icon/homeTabActive.svg";
import deliveryLogo from "@/assets/icon/packageIcon.svg";

import NearYou from "@/components/Store/NearYou.vue";

import { ref } from "vue";

const isOpen = ref(true);
const canDismiss = ref(false);

const services = ref([
  {
    title: "Satisfy your cravings",
    logo: storeLogo,
    route: "Store",
  },
  {
    title: "Package Delivery",
    logo: deliveryLogo,
    route: "Delivery",
  },
]);

onIonViewWillEnter(() => {
  isOpen.value = true;
  canDismiss.value = false;
});

const closeModal = () => {
  canDismiss.value = true;
  setTimeout(() => {
    isOpen.value = false;
  }, 500);
  console.log(canDismiss.value, isOpen.value);
};
</script>
