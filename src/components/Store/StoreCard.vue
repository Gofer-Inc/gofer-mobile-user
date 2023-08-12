<template>
  <ion-card
    v-if="store"
    mode="ios"
    class="custom relative m-0 mx-auto flex w-full max-w-sm flex-col rounded-2xl"
  >
    <div
      @click="
        $emit('function'),
          $router.push({ name: 'ViewStore', params: { id: store.id } })
      "
      class="relative h-40 max-h-full flex-shrink-0 overflow-hidden rounded-2xl bg-light"
    >
      <img
        style="width: 100% !important; height: 100% !important"
        :alt="store.name"
        class="h-full rounded-2xl object-cover"
        :src="
          store.vendor && store.vendor.logoUrl ? store.vendor.logoUrl : dummy
        "
      />

      <div
        v-if="closed && !simple"
        class="absolute inset-0 z-20 bg-dark-400 opacity-50"
      ></div>
      <div
        v-if="closed && !simple"
        class="absolute inset-0 z-30 flex items-center justify-center gap-1"
      >
        <ion-icon
          class="text-xl text-white"
          color=""
          :icon="closeCircleOutline"
        />
        <span class="text-base font-medium text-white"> Close </span>
      </div>
    </div>
    <ion-card-content class="px-2 py-4">
      <div class="flex items-center justify-between">
        <span
          :class="closed ? 'text-dark-100' : 'text-dark-400'"
          class="truncate text-lg font-medium"
          >{{ store.name }}</span
        >
        <ion-icon
          v-if="!simple"
          :color="isFavourite ? 'secondary' : ''"
          class="text-2xl"
          :class="closed ? 'opacity-50' : ''"
          @click="isFavourite = !isFavourite"
          :icon="isFavourite ? heart : heartOutline"
        />
      </div>
      <div
        v-if="!simple"
        :class="closed ? 'text-dark-100' : 'text-dark-300'"
        class="mt-1 flex items-center gap-1 text-sm"
      >
        <div class="flex items-center">
          <span class="font-medium">{{ 4.3 }}({{ 200 }})</span>
          <ion-icon class="text-md" color="warning" :icon="star" />
        </div>
        <div class="flex items-center gap-1">
          <ion-icon class="text-md" :icon="timeOutline" />
          <span>{{ "30 Min" }}</span>
        </div>
        <div class="flex items-center gap-1">
          <ion-icon class="text-md" :icon="bicycle" />
          <!-- <span
            :class="
              store && store.delivery && store.delivery.free
                ? 'text-primary font-bold'
                : ''
            "
            >{{
              store && store.delivery && store.delivery.free
                ? "FREE"
                : formatAmount(store && store.delivery && store.delivery.price)
            }}</span
          > -->
        </div>
      </div>
    </ion-card-content>

    <div
      v-if="false"
      class="absolute right-4 top-6 rounded-md bg-orange-50 bg-white p-2 text-xs font-medium text-dark-400 shadow-md"
    >
      <ion-icon color="primary" :icon="giftOutline"></ion-icon>
      <span> Up to 10% off</span>
    </div>
  </ion-card>
</template>

<script setup>
import {
  IonCard,
  IonCardContent,
  IonIcon,
  //   IonCardHeader,
  //   IonCardSubtitle,
  //   IonCardTitle,
} from "@ionic/vue";

import {
  heartOutline,
  heart,
  star,
  bicycle,
  timeOutline,
  giftOutline,
  closeCircleOutline,
} from "ionicons/icons";

import dummy from "@/assets/images/dummy.png";

import { computed, ref } from "vue";
import { helperFunctions } from "@/composable/helperFunctions";

const { formatAmount } = helperFunctions;

const props = defineProps({
  store: Object,

  simple: {
    type: Boolean,
    default: false,
  },
});

defineEmits("function");

const closed = computed(() => {
  let isClose = false;
  // const currentHour = new Date().getHours();

  // const openingHour = props.store && props.store.workingHours.opening;
  // const closingHour = props.store && props.store.workingHours.closing;

  // if (props.store && props.store.storeClosed) {
  //   isClose = true;
  // } else if (currentHour >= closingHour || currentHour < openingHour) {
  //   isClose = true;
  // }
  //   isClose = false;

  return isClose;
});
const isFavourite = ref(false);
</script>

<style scoped>
ion-card.custom {
  box-shadow: none;
}
</style>
