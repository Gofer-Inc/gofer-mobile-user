<template>
  <ion-page>
    <gNav :showBackButton="false" borderless color="primary">
      <div class="flex items-center justify-between p-2 py-3 text-dark-300">
        <div class="flex w-10 flex-col text-base">
          <img src="@/assets/icon/gofer-skin.svg" alt="" />
        </div>

        <div class="flex items-center gap-1 text-xs">
          <!-- <ion-icon class="text-white" :icon="location"></ion-icon> -->
          <span class="font-medium text-white">Gofer</span>
          <!-- <ion-icon class="text-white" :icon="chevronDown"></ion-icon> -->
        </div>

        <div class="flex items-center gap-3 text-2xl">
          <ion-buttons slot="end">
            <ion-button
              fill="clear"
              class="animate__animated animate__rubberBand animate__delay-4s animate__infinite relative"
            >
              <ion-icon class="text-white" :icon="gift"></ion-icon>
              <div
                class="absolute -right-1 top-1 rounded-full border-2 border-white bg-secondary p-1"
              ></div>
            </ion-button>
          </ion-buttons>
        </div>
      </div>
    </gNav>

    <ion-content fullscreen color="primary" class="relative">
      <div class="fixed z-[-1] w-full">
        <div
          class="justify-item-center ion-padding mx-auto grid grid-cols-2 place-content-center gap-4 py-20"
        >
          <div
            v-for="(service, i) in services"
            @click="$router.push({ name: service.route })"
            :key="i"
            style="box-shadow: 6px 6px 24px 2px rgba(0, 0, 0, 0.1)"
            :class="`${i == 1 ? 'animate__delay-2s mt-24' : ''} `"
            class="ion-padding animate__animated animate__pulse animate__slower animate__infinite mx-auto flex h-64 w-52 max-w-full flex-col gap-6 rounded-3xl bg-white sm:w-10/12 md:w-8/12"
          >
            <div :class="i == 1 ? 'w-11/12' : 'w-10/12'" class="mx-auto h-full">
              <img
                :src="service.logo"
                :alt="service.title"
                class="mx-auto h-full"
              />
            </div>
            <div
              class="text-xl font-medium leading-7 text-dark-300 sm:text-2xl"
            >
              {{ service.title }}
            </div>
          </div>
        </div>
      </div>
      <div class="pointer-events-none h-[60vh]"></div>
      <NearYou class="z-10" v-if="restaurants.length" />
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
  onIonViewWillEnter,
} from "@ionic/vue";
import { gift } from "ionicons/icons";

import storeLogo from "@/assets/icon/homeTabActive.svg";
import deliveryLogo from "@/assets/icon/packageIcon.svg";

import NearYou from "@/components/Store/NearYou.vue";

import { ref, inject, computed } from "vue";
import { useDataStore } from "@/stores/data.js";

const http = inject("http");
const store = useDataStore();

const loading = ref(false);

const restaurants = computed(() => store.restaurants);
console.log("restaurants", restaurants.value);

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

onIonViewWillEnter(async () => {
  await initRestaurants();
});

const initRestaurants = async () => {
  loading.value = true;
  try {
    const res = await http({
      endpoint: "GetRestaurants",
      httpMethod: "get",
    });
    store.$patch({
      restaurants: res,
    });
    console.log(res);
    loading.value = false;
  } catch (error) {
    loading.value = false;
  }
};
</script>
