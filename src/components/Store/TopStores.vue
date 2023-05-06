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
import storeDB from "@/utils/stores.js";

import { computed } from "vue";

import StoreCard from "@/components/Store/StoreCard.vue";

const featured = computed(() => storeDB.filter((el) => el.featured));
</script>

<style></style>
