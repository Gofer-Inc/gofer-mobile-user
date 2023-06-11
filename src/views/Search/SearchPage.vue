<template>
  <ion-page>
    <ion-header mode="ios" class="ion-no-border bg-white">
      <gNav :showBackButton="false">
        <div class="flex items-center justify-between gap-2 px-2 py-3">
          <h2 class="text-xl font-medium">Search</h2>
          <ion-buttons slot="end">
            <ion-button fill="clear">
              <ion-icon
                class="text-dark-300"
                slot="icon-only"
                :icon="filter"
              ></ion-icon
            ></ion-button>
          </ion-buttons>
        </div>
      </gNav>
      <div class="mx-2 -mt-2">
        <gSearch
          placeholder="Search for restaurants, food, drinks..."
          @handleChange="handleSearch"
          v-model="searchText"
        />
      </div>
    </ion-header>
    <ion-content fullscreen>
      <div v-if="!displaySearch" class="ion-padding flex flex-col gap-6 pb-10">
        <div class="flex flex-col gap-2">
          <gTitle title="Top Categories" />
          <div class="flex flex-wrap items-center justify-around gap-2">
            <div
              v-for="(category, i) in categories"
              @click="(searchText = category.name), handleSearch()"
              :key="`category-${i}`"
              class="flex flex-col gap-1"
            >
              <div
                class="flex h-20 w-20 flex-shrink-0 overflow-hidden rounded-2xl border-2 border-primary-light"
              >
                <img :src="category.logo" alt="" class="h-full object-cover" />
              </div>
              <div class="text-center text-sm text-dark-300">
                {{ category.name }}
              </div>
            </div>
          </div>
        </div>

        <TopStores />
      </div>

      <div v-else class="ion-padding flex flex-col gap-6">
        {{ searchText }}
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import {
  IonPage,
  IonHeader,
  IonContent,
  IonButton,
  IonButtons,
  IonIcon,
} from "@ionic/vue";
import { filter } from "ionicons/icons";

import img1 from "@/assets/images/img1.webp";
import img2 from "@/assets/images/img2.jpeg";
import img3 from "@/assets/images/img3.jpeg";
import img4 from "@/assets/images/img4.webp";

import TopStores from "@/components/Store/TopStores.vue";

import { reactive, ref } from "vue";

const searchText = ref("");
const displaySearch = ref(false);

const categories = reactive([
  {
    logo: img1,
    name: "African",
  },
  {
    logo: img2,
    name: "Burgers",
  },
  {
    logo: img3,
    name: "Pizza",
  },
  {
    logo: img4,
    name: "Drinks",
  },
]);

const handleSearch = () => {
  if (searchText.value.trim() !== "") {
    console.log(searchText.value);
    displaySearch.value = true;
  } else {
    displaySearch.value = false;
  }
};
</script>
