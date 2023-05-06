<template>
  <ion-page>
    <gNav title="Orders" />
    <ion-content fullscreen>
      <div class="flex flex-col gap-6 ion-padding">
        <div>
          <gTitle title="Upcoming Orders" />
          <div class="flex flex-col gap-6 mt-4">
            <PackageCard
              v-for="item in packages"
              :key="item._id"
              :data="item"
            />
          </div>
        </div>
        <div>
          <gTitle title="Pasted Orders" />
          <div class="flex flex-col gap-6 mt-4">
            <PackageCard
              class="opacity-50"
              v-for="item in packages"
              :key="item._id"
              :data="item"
            />
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { IonPage, IonContent } from "@ionic/vue";
// import { chevronDown, filter, notifications } from "ionicons/icons";

import PackageCard from "@/components/Delivery/PackageCard.vue";
import { computed } from "vue";

import packagesDB from "@/utils/packages.js";

const packages = computed(() => packagesDB);
console.log(packages.value);
</script>
