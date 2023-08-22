<template>
  <div>
    <gTitle title="Top Restaurants" />

    <div class="grid grid-cols-2 items-center gap-4">
      <StoreCard
        simple
        v-for="(store, i) in featured"
        :key="i"
        :store="store"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

import StoreCard from "@/components/Store/StoreCard.vue";
import { useDataStore } from "@/stores/data.js";

const store = useDataStore();

const featured = computed(() => store.restaurants.slice(2, 6));
</script>

<style></style>
