<template>
  <ion-page>
    <gNav :showBackButton="false">
      <div
        class="relative flex items-center justify-between p-2 text-dark-300 py-3"
      >
        <div class="flex flex-col text-base">
          <div
            @click="$router.push({ name: 'Start' })"
            class="text-primary text-xs font-medium flex items-center gap-1"
          >
            <ion-icon class="" color="primary" :icon="chevronBack"></ion-icon>
            <span>Restaurant </span>
          </div>
        </div>

        <div
          @click="addressModal = true"
          class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center text-xs gap-1"
        >
          <ion-icon color="secondary" :icon="location"></ion-icon>
          <span class="text-dark-400 font-medium">Yenagoa</span>
          <ion-icon class="" :icon="chevronDown"></ion-icon>
        </div>

        <div class="flex items-center gap-3 text-2xl">
          <ion-buttons slot="end">
            <ion-button fill="clear">
              <ion-icon
                class="text-dark-300"
                slot="icon-only"
                :icon="filter"
              ></ion-icon
            ></ion-button>
            <ion-button
              fill="clear"
              class="relative animate__animated animate__rubberBand animate__delay-4s animate__infinite"
            >
              <ion-icon color="primary" :icon="gift"></ion-icon>
              <div
                class="absolute bg-secondary p-1 rounded-full -right-1 top-1 border-2 border-white"
              ></div>
            </ion-button>
          </ion-buttons>
        </div>
      </div>
    </gNav>
    <ion-content fullscreen class="ion-padding">
      <ion-refresher slot="fixed" @ionRefresh="reload($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>

      <div class="grid grid-cols-1 gap-4 -mt-4">
        <StoreCategory />
        <HandPicked />
        <FeaturedStore />

        <div>
          <gTitle title="All Restaurants" />
          <div class="flex flex-col gap-4">
            <StoreCard
              v-for="(store, i) in visibleStores"
              :key="i"
              :store="store"
            />
          </div>
        </div>
      </div>
      <ion-infinite-scroll @ionInfinite="ionInfinite">
        <ion-infinite-scroll-content></ion-infinite-scroll-content>
      </ion-infinite-scroll>
    </ion-content>

    <gAddress :isOpen="addressModal" @close="addressModal = false" />
  </ion-page>
</template>

<script setup>
import {
  IonPage,
  IonContent,
  IonIcon,
  IonRefresher,
  IonRefresherContent,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
} from "@ionic/vue";
import {
  chevronDown,
  filter,
  gift,
  chevronBack,
  location,
} from "ionicons/icons";

import storeDB from "@/utils/stores.js";

import StoreCategory from "@/components/Store/StoreCategory.vue";
import HandPicked from "@/components/Store/HandPicked.vue";
import FeaturedStore from "@/components/Store/FeaturedStore.vue";
import StoreCard from "@/components/Store/StoreCard.vue";
import { Geolocation } from "@capacitor/geolocation";

import { computed, ref } from "vue";

const addressModal = ref(false);

const visibleStores = ref([]);
const storesIndex = ref(5);
const allStores = computed(() => storeDB);

const printCurrentPosition = async () => {
  const coordinates = await Geolocation.getCurrentPosition();

  console.log("Current position:", coordinates);
};

printCurrentPosition();

const updateVisibleStores = () => {
  let currentIndex = visibleStores.value.length;
  visibleStores.value.push(
    ...allStores.value.slice(currentIndex, currentIndex + storesIndex.value)
  );
};

updateVisibleStores();

const ionInfinite = (event) => {
  updateVisibleStores();
  setTimeout(() => event.target.complete(), 500);
};

const reload = async (event) => {
  setTimeout(() => event.target.complete(), 500);
};
</script>

<style scoped></style>
