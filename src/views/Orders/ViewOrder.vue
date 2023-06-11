<template>
  <ion-page>
    <gNav :showBackButton="false" title="Order" class="py-2">
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
          :class="`${getStatus('Processing').text} ${
            getStatus('Processing').border
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
    </ion-content>
    <gFooter>
      <div class="flex flex-col gap-4 mb-2">
        <gButton block>Track Order</gButton>
      </div>
    </gFooter>
  </ion-page>

  <!-- <ion-page v-else>
      <ion-content class="ion-padding">
        <div class="w-full h-full flex items-center justify-center">
          <ion-spinner></ion-spinner>
        </div>
      </ion-content>
    </ion-page> -->
</template>

<script setup>
import {
  IonPage,
  IonContent,
  IonButtons,
  IonButton,
  IonIcon,
  //   IonSpinner,
  //   IonChip,
  IonRefresher,
  IonRefresherContent,
  onIonViewWillEnter,
} from "@ionic/vue";

import { chevronBack } from "ionicons/icons";

import { onMounted } from "vue";
import { useRoute } from "vue-router";
// import { helperFunctions } from "@/composable/helperFunctions";

// const {} = helperFunctions;

const route = useRoute();

const reload = async (event) => {
  setTimeout(() => event.target.complete(), 500);
};

onIonViewWillEnter(async () => {
  const orderNo = await route.params.id;
  // packageData.value = packages.value.find((el) => el.orderNo == orderNo);

  console.log(orderNo);
});

onMounted(async () => {
  const orderNo = await route.params.id;
  // packageData.value = packages.value.find((el) => el.orderNo == orderNo);

  console.log(orderNo);
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
