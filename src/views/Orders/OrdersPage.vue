<template>
  <ion-page>
    <ion-header mode="ios" class="ion-no-border bg-white">
      <gNav :showBackButton="false">
        <div class="flex items-center justify-between gap-2 px-2 py-3">
          <h2 class="text-xl font-medium">My Orders</h2>
          <!-- <ion-buttons slot="end">
            <ion-button fill="clear">
              <ion-icon
                class="text-dark-300"
                slot="icon-only"
                :icon="filter"
              ></ion-icon
            ></ion-button>
          </ion-buttons> -->
        </div>
      </gNav>
      <div class="px-4">
        <ion-segment
          mode="ios"
          :value="currentTab"
          class="custom p-1"
          @ionChange="onChange"
        >
          <ion-segment-button value="ongoing" class="custom p-1">
            <ion-label class="flex items-center gap-1">
              <ion-icon :icon="bicycle"></ion-icon>
              Ongoing</ion-label
            >
          </ion-segment-button>
          <ion-segment-button value="Completed" class="custom p-1">
            <ion-label class="flex items-center gap-1">
              <ion-icon :icon="walk"></ion-icon>
              Completed</ion-label
            >
          </ion-segment-button>
        </ion-segment>
      </div>
    </ion-header>
    <ion-content fullscreen>
      <div class="flex flex-col gap-6 ion-padding">
        <div>
          <!-- <gTitle title="Upcoming Orders" /> -->
          <div class="flex flex-col gap-6 mt-4">
            <OrderCard v-for="item in packages" :key="item._id" :data="item" />
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { IonPage, IonHeader, IonContent } from "@ionic/vue";
// import { chevronDown, filter, notifications } from "ionicons/icons";

import OrderCard from "@/components/Order/OrderCard.vue";

import { computed, ref } from "vue";

import packagesDB from "@/utils/packages.js";

const packages = computed(() => packagesDB);
console.log(packages.value);

const currentTab = ref("ongoing");

const onChange = (e) => {
  currentTab.value = e.detail.value;
};
</script>
