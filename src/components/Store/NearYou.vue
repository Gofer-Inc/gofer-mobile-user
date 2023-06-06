<template>
  <div class="ion-padding bg-white rounded-t-xl shadow-xl overflow-hidden">
    <div
      class="mx-auto w-12 p-[2px] cursor-pointer bg-dark-100 rounded-full -mt-1"
    ></div>
    <gTitle
      title="Stores near you"
      icon="storefront"
      iconColor="primary"
      text="See all"
      class="pl-2"
    />
    <div class="flex flex-col gap-4">
      <StoreCard
        @function="$emit('close')"
        v-for="(store, i) in nearyou"
        :key="i"
        :store="store"
      />
    </div>
  </div>
</template>

<script setup>
// import { IonContent } from "@ionic/vue";
import storeDB from "@/utils/stores.js";
import { computed } from "vue";

import StoreCard from "@/components/Store/StoreCard.vue";

const nearyou = computed(() => storeDB.slice(0, 4));

defineEmits(["close"]);
</script>

<style></style>
