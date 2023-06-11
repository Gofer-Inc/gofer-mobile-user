<template>
  <div
    @click="
      $router.push({
        name: 'ViewOrder',
        params: { id: '1' },
      })
    "
    class="flex text-left items-center gap-4"
  >
    <div>
      <div
        class="w-24 h-24 border-2 border-primary-light rounded-2xl overflow-hidden"
      >
        <img src="@/assets/images/mac.png" alt="" class="h-full object-cover" />
        <!-- <img :src="data && data.images[0]" alt="" class="h-full object-cover" /> -->
      </div>
    </div>
    <div class="flex w-full flex-col gap-2 text-sm py-1">
      <div>
        <div class="grid grid-cols-4 gap-1">
          <span class="col-span-3 text-dark font-medium text-lg truncate">
            Chicken Republic
          </span>

          <span
            :class="[
              getStatus('Processing').text,
              getStatus('Processing').border,
            ]"
            class="rounded-full p-[1px] px-2 text-xs flex items-center justify-center"
            >{{ "Processing" }}
          </span>
        </div>

        <div class="line-clamp-2">
          <span class="text-gray-500">
            Refuel Max - Shortbread, chocolate turtle cookies, and red velvet.
          </span>
        </div>
      </div>
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2 text-xs">
          <span class="text-gray-400">9:40AM</span>
          <span class="text-gray-700">2.items</span>
        </div>
        <div class="text-sm text-primary font-medium">
          {{ formatAmount(3700) }}
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
