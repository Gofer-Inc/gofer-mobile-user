<template>
  <div class="flex text-left items-center gap-4">
    <div>
      <div
        class="w-24 h-24 border-2 border-primary-light rounded-2xl overflow-hidden"
      >
        <img :src="data && data.images[0]" alt="" class="h-full object-cover" />
      </div>
    </div>
    <div class="flex w-full flex-col gap-2 text-sm py-1">
      <div class="flex justify-between">
        <span class="text-gray-500 text-sm">{{
          data && data.description
        }}</span>
        <div>
          <span
            :class="`${getStatus(data && data.status).text} ${
              getStatus(data && data.status).border
            }`"
            class="rounded-full border p-1 px-2 text-xs"
            >{{ data && data.status }}
          </span>
        </div>
      </div>
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2 text-xs">
          <span class="text-gray-400">{{ data && data.createdAt }}</span>
          <span class="text-dark font-font">#{{ data && data.orderNo }}</span>
        </div>
        <div class="text-sm text-primary font-medium">
          {{ formatAmount(data && data.totalCost) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// import { IonIcon } from "@ionic/vue";

import { helperFunctions } from "@/composable/helperFunctions";
const { formatAmount } = helperFunctions;

defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
});

const getStatus = (status) => {
  let obj = {
    Pending: "primary",
    Received: "info",
    Ongoing: "info",
    Delivered: "success",
  };

  return { text: `text-${obj[status]}`, border: `border-${obj[status]}` };
};
</script>

<style></style>
