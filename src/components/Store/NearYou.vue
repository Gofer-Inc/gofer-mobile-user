<template>
  <ion-page>
    <gNav borderless>
      <gTitle
        title="Stores near you"
        icon="storefront"
        iconColor="primary"
        text="See all"
      />
    </gNav>

    <ion-content class="ion-padding">
      <div class="flex flex-col gap-4">
        <StoreCard
          @function="$emit('close')"
          v-for="(store, i) in nearyou"
          :key="i"
          :store="store"
        />
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { IonPage, IonContent } from "@ionic/vue";
import storeDB from "@/utils/stores.js";
import { computed } from "vue";

import StoreCard from "@/components/Store/StoreCard.vue";

const nearyou = computed(() => storeDB.slice(0, 4));

defineEmits(["close"]);
</script>

<style></style>
