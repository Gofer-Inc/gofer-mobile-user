<template>
  <ion-page v-if="packageData">
    <gNav
      :showBackButton="false"
      :title="packageData && packageData.orderNo"
      class="py-2"
    >
      <ion-buttons slot="start">
        <ion-button @click="$router.go(-1)" fill="clear">
          <ion-icon
            class="text-dark-300"
            slot="icon-only"
            :icon="chevronBack"
          ></ion-icon
        ></ion-button>
      </ion-buttons>
      <ion-buttons slot="end">
        <span
          :class="`${getStatus(data && data.status).text} ${
            getStatus(data && data.status).border
          }`"
          class="rounded-full border p-1 px-2 text-xs"
          >Accepted</span
        >
      </ion-buttons>
    </gNav>
    <ion-content fullscreen>
      <ion-refresher slot="fixed" @ionRefresh="reload($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>

      <div class="flex items-center justify-between pt-4 px-4 text-xl">
        <div class="text-sm flex items-center gap-1">
          <ion-icon :icon="documentText" color="primary" class="text-xl">
          </ion-icon>
          <span class="text-dark-300">Instructions</span>
        </div>

        <div class="font-medium text-primary">
          {{ formatAmount(packageData.totalCost) }}
        </div>
      </div>

      <PackageInfo :package="packageData" />
    </ion-content>
    <gFooter>
      <div class="flex flex-col gap-4 mb-2">
        <gButton block>Track {{ packageData.orderNo }}</gButton>
        <gButton disabled block color="medium">Confirm Delivery</gButton>
      </div>
    </gFooter>
  </ion-page>

  <ion-page v-else>
    <ion-content class="ion-padding">
      <div class="w-full h-full flex items-center justify-center">
        <ion-spinner></ion-spinner>
      </div>
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
  IonSpinner,
  //   IonChip,
  IonRefresher,
  IonRefresherContent,
  onIonViewWillEnter,
} from "@ionic/vue";

import { documentText, chevronBack } from "ionicons/icons";

import packagesDB from "@/utils/packages.js";
import PackageInfo from "@/components/Delivery/PackageInfo.vue";
import { computed, onMounted, ref } from "vue";
import { helperFunctions } from "@/composable/helperFunctions";
import { useRoute } from "vue-router";

const { formatAmount } = helperFunctions;

const route = useRoute();
const packages = computed(() => packagesDB);
const packageData = ref(null);

console.log(packages.value);

const reload = async (event) => {
  setTimeout(() => event.target.complete(), 500);
};

onIonViewWillEnter(async () => {
  const orderNo = await route.params.id;
  packageData.value = packages.value.find((el) => el.orderNo == orderNo);

  console.log(packageData.value, orderNo);
});

onMounted(async () => {
  const orderNo = await route.params.id;
  packageData.value = packages.value.find((el) => el.orderNo == orderNo);

  console.log(packageData.value, orderNo);
});

const getStatus = (status) => {
  let obj = {
    Pending: {
      text: "text-primary",
      border: "border-primary",
    },
    Processing: {
      text: "text-info",
      border: "border-info",
    },
    Delivered: {
      text: "text-success",
      border: "border-success",
    },
  };

  return obj[status];
};
</script>

<style></style>
