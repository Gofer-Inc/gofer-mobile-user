<template>
  <div class="ion-padding overflow-hidden rounded-t-xl bg-white shadow-xl">
    <div
      class="mx-auto -mt-1 w-12 cursor-pointer rounded-full bg-dark-100 p-[2px]"
    ></div>
    <gTitle
      title="Featured stores"
      icon="storefront"
      iconColor="primary"
      text="See all"
      class="pl-2"
    />
    <div class="flex flex-col gap-4">
      <StoreCard
        @function="$emit('close')"
        v-for="(store, i) in restaurants"
        :key="i"
        :store="store"
      />
    </div>
  </div>
</template>

<script setup>
// import { IonContent } from "@ionic/vue";
import StoreCard from "@/components/Store/StoreCard.vue";
import storeDB from "@/utils/stores.js";

import { inject, computed } from "vue";
import { useDataStore } from "@/stores/data.js";

const store = useDataStore();

const restaurants = computed(() => store.restaurants.slice(0, 4));

defineEmits(["close"]);
</script>

<style></style>
