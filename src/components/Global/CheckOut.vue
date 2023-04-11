<template>
  <gModal
    :isOpen="isOpen"
    @close="$emit('close')"
    type="full"
    title="Checkout"
    :spacing="false"
    showCloseButton
  >
    <ion-page>
      <ion-content fullscreen class="">
        <PackageInfo :package="packageData" />
      </ion-content>
      <gFooter :spacing="false" class="p-0">
        <gZigzag />
        <div class="w-full h-auto py-4 ion-padding flex flex-col gap-2">
          <div
            :class="est.title === 'Total (incl. VAT)' ? 'font-medium' : ''"
            class="flex items-center justify-between text-base"
            v-for="(est, i) in estimate"
            :key="i"
          >
            <span class="text-dark-300">{{ est.title }}</span>
            <span class="text-dark-400">{{ formatAmount(est.amount) }}</span>
          </div>

          <gButton
            :class="isIos ? 'mb-20' : 'mb-10'"
            class="my-4"
            block
            @click="closeFN"
            >Checkout
          </gButton>
        </div>
      </gFooter>
    </ion-page>
  </gModal>
</template>

<script setup>
import { IonPage, IonContent } from "@ionic/vue";

import PackageInfo from "@/components/Delivery/PackageInfo.vue";

import { computed } from "vue";
import { helperFunctions } from "@/composable/helperFunctions";
import { Capacitor } from "@capacitor/core";

const { formatAmount } = helperFunctions;

defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: "store",
  },
  packageData: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(["close"]);

const isIos = computed(() =>
  Capacitor.getPlatform() === "ios" ? true : false
);

const estimate = computed(() => {
  return [
    {
      title: "Estimate Deliver",
      amount: 4500,
    },
    {
      title: "Service Fee",
      amount: 500,
    },
    {
      title: "Total (incl. VAT)",
      amount: 5000,
    },
  ];
});
const closeFN = () => {
  emit("close");
};
</script>

<style scope>
/* .zigzag {
  background-image: url("@/assets/icon/zigzag.svg");
  background-position: center top;
  background-size: cover;
  background-repeat: no-repeat;
} */
</style>
