<template>
  <ion-page>
    <gNav :showBackButton="false">
      <div
        class="relative flex items-center justify-between p-2 py-3 text-dark-300"
      >
        <div class="flex flex-col text-base">
          <div
            @click="$router.push({ name: 'Start' })"
            class="flex items-center gap-1 text-xs font-medium text-primary"
          >
            <ion-icon class="" color="primary" :icon="chevronBack"></ion-icon>
            <span>Restaurant </span>
          </div>
        </div>

        <div
          @click="addressModal = true"
          class="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 transform items-center gap-1 text-xs"
        >
          <ion-icon color="secondary" :icon="location"></ion-icon>
          <span class="font-medium text-dark-400">Yenagoa</span>
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
              class="animate__animated animate__rubberBand animate__delay-4s animate__infinite relative"
            >
              <ion-icon color="primary" :icon="gift"></ion-icon>
              <div
                class="absolute -right-1 top-1 rounded-full border-2 border-white bg-secondary p-1"
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

      <div class="-mt-4 grid grid-cols-1 gap-4">
        <StoreCategory />
        <!-- <HandPicked />
        <FeaturedStore /> -->

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
  IonButtons,
  IonButton,
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
import { useDataStore } from "@/stores/data.js";

const store = useDataStore();
const addressModal = ref(false);

const visibleStores = ref([]);
const storesIndex = ref(5);
const allStores = computed(() => store.restaurants);

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
