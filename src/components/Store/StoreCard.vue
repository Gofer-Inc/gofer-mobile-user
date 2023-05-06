<template>
  <ion-card
    mode="ios"
    class="custom mx-auto w-full relative max-w-sm rounded-2xl m-0 flex flex-col"
  >
    <div
      @click="
        $emit('function'),
          $router.push({ name: 'ViewStore', params: { id: store.id } })
      "
      class="relative bg-primary h-40 max-h-full flex-shrink-0 overflow-hidden rounded-2xl"
    >
      <img
        style="width: 100% !important; height: 100% !important"
        :alt="store && store.name"
        class="rounded-2xl h-full object-cover"
        :src="store && store.cover"
      />

      <div
        v-if="closed && !simple"
        class="absolute bg-dark-400 opacity-50 inset-0 z-20"
      ></div>
      <div
        v-if="closed && !simple"
        class="absolute inset-0 flex items-center justify-center gap-1 z-30"
      >
        <ion-icon
          class="text-xl text-white"
          color=""
          :icon="closeCircleOutline"
        />
        <span class="text-white text-base font-medium"> Close </span>
      </div>
    </div>
    <ion-card-content class="px-2 py-4">
      <div class="flex items-center justify-between">
        <span
          :class="closed ? 'text-dark-100' : 'text-dark-400'"
          class="text-lg font-medium truncate"
          >{{ store && store.name }}</span
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
        class="text-sm flex items-center gap-1 mt-1"
      >
        <div class="flex items-center">
          <span class="font-medium"
            >{{ store && store.rating && store.rating.rate }}({{
              store && store.rating && store.rating.number
            }})</span
          >
          <ion-icon class="text-md" color="warning" :icon="star" />
        </div>
        <div class="flex items-center gap-1">
          <ion-icon class="text-md" :icon="timeOutline" />
          <span>{{ store && store.averageDeliveryTime }}</span>
        </div>
        <div class="flex items-center gap-1">
          <ion-icon class="text-md" :icon="bicycle" />
          <span
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
          >
        </div>
      </div>
    </ion-card-content>

    <div
      v-if="store && store.discount"
      class="rounded-md bg-orange-50 absolute right-4 top-6 bg-white shadow-md text-dark-400 text-xs font-medium p-2"
    >
      <ion-icon color="primary" :icon="giftOutline"></ion-icon>
      <span> Up to {{ store && store.discount.percent }}% off</span>
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
  store: {
    type: Object,
    default: () => ({
      name: "Chicken Republic",

      contact: {
        state: "Bayelsa",
        address: "Kpansia, Beside God is Good Motors, Mbiama – Yenagoa Road",
        phoneNumber: "09088978929",
        email: "info@chicken-republic.com",
        website: "https://chicken-republic.com",
      },
      storeClosed: false,
      workingHours: {
        opening: 8,
        closing: 18,
      },
      favourite: false,
      cover: dummy,
      discount: {
        amount: 0,
        percent: 20,
        code: "BADJD",
      },
      rating: {
        rate: 4.3,
        number: 200,
      },
      delivery: {
        free: false,
        price: 400,
      },
      averageDeliveryTime: "25 Min",
    }),
  },

  simple: {
    type: Boolean,
    default: false,
  },
});

defineEmits("function");

const closed = computed(() => {
  let isClose = false;
  const currentHour = new Date().getHours();

  const openingHour = props.store && props.store.workingHours.opening;
  const closingHour = props.store && props.store.workingHours.closing;

  if (props.store && props.store.storeClosed) {
    isClose = true;
  } else if (currentHour >= closingHour || currentHour < openingHour) {
    isClose = true;
  }
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
