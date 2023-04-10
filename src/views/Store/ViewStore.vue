<template>
  <ion-page v-if="store">
    <ion-header mode="ios">
      <gNav borderless :showBackButton="false" class="relative pt-3">
        <ion-buttons slot="start">
          <ion-button @click="$router.go(-1)" fill="clear">
            <ion-icon
              class="text-dark-300"
              slot="icon-only"
              :icon="chevronBack"
            ></ion-icon
          ></ion-button>
        </ion-buttons>
        <div
          class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        >
          <ion-segment
            mode="ios"
            value="delivery"
            class="custom"
            @ionChange="changeDeliveryOption"
          >
            <ion-segment-button value="delivery" class="custom">
              <ion-label class="flex items-center gap-1">
                <ion-icon :icon="bicycle"></ion-icon>
                Delivery</ion-label
              >
            </ion-segment-button>
            <ion-segment-button value="pickup" class="custom">
              <ion-label class="flex items-center gap-1">
                <ion-icon :icon="walk"></ion-icon>
                Pick up</ion-label
              >
            </ion-segment-button>
          </ion-segment>
        </div>
        <ion-buttons slot="end">
          <ion-button @click="shareStore" fill="clear">
            <ion-icon
              class="text-dark-300"
              slot="icon-only"
              :icon="shareSocial"
            ></ion-icon
          ></ion-button>
          <!-- <ion-button fill="clear">
            <ion-icon
              class="text-dark-300"
              slot="icon-only"
              :icon="search"
            ></ion-icon
          ></ion-button> -->
        </ion-buttons>
      </gNav>

      <div class="ion-padding flex flex-col gap-3 border-b border-outline mt-2">
        <div class="flex items-center justify-between">
          <span class="text-dark-400 text-2xl font-medium">
            {{ store.name }}</span
          >
          <ion-icon
            :color="isFavourite ? 'secondary' : ''"
            class="text-2xl"
            @click="isFavourite = !isFavourite"
            :icon="isFavourite ? heart : heartOutline"
          />
        </div>

        <div class="flex items-center gap-2 text-xs -mt-1">
          <span class="font-medium">{{
            store && store.rating && store.rating.rate
          }}</span>
          <ion-icon class="text-md" color="primary" :icon="star" />
          <span
            >{{ store && store.rating && store.rating.number }}+ Ratings</span
          >
          <gButton
            @click="moreInfoModal = true"
            size="small"
            fill="clear"
            class="m-0 p-0 text-xs -ml-2 -mt-2 underline"
            >More Info</gButton
          >
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <div class="flex items-center gap-2">
              <img src="@/assets/icon/naira-2.svg" alt="" />
              <div class="flex flex-col text-sm">
                <span class="text-dark-400 font-medium">Free</span>
                <span class="text-xs text-dark-200 -mt-1">Delivery</span>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <img src="@/assets/icon/timer.svg" alt="" />
              <div class="flex flex-col text-sm">
                <span class="text-dark-400 font-medium">25 - 30</span>
                <span class="text-xs text-dark-200 -mt-1">Minutes</span>
              </div>
            </div>
          </div>

          <div class="text-error text-xs text-center">
            <ion-chip
              v-if="closed"
              color="danger"
              class="store border border-error"
            >
              <ion-label class="flex flex-col text-left py-1 text-xs"
                ><span class="font-medium">CLOSED</span>
                <div>
                  Opens at
                  <span class="font-medium"
                    >{{ store.workingHours.opening }}AM</span
                  >
                </div>
              </ion-label>
            </ion-chip>

            <div></div>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <gButton
            appendIcon="people"
            iconColor="dark"
            fill="outline"
            size="small"
            class="mx-0"
          >
            <span class="text-xs text-dark-300">Group Order</span>
          </gButton>
          <gButton
            appendIcon="time"
            iconColor="dark"
            fill="outline"
            size="small"
            class="mx-0"
          >
            <span class="text-xs text-dark-300">Schedule</span>
          </gButton>
        </div>

        <div
          class="animation flex items-center gap-1 text-xs mt-3 pb-1 -mb-1 overflow-x-auto no-scrollbar"
        >
          <div
            @click="selectMenu($event, i)"
            :class="
              activeMenu == i
                ? 'bg-orange-50 text-primary border border-primary'
                : 'text-dark-300'
            "
            class="px-3 py-1 rounded-full"
            v-for="(menu, i) in menus"
            :key="i"
          >
            {{ menu.title }}
          </div>
        </div>
      </div>
    </ion-header>

    <ion-content>
      <ion-refresher slot="fixed" @ionRefresh="reload($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>

      <!--  Discount and Offers -->
      <div
        v-if="store.discount"
        class="flex items-center justify-center p-2 bg-primary-lighter border border-primary-light"
      >
        <ion-button
          fill="clear"
          class="relative animate__animated animate__rubberBand animate__delay-4s animate__infinite m-0"
        >
          <ion-icon color="primary" :icon="gift"></ion-icon>
          <div
            class="absolute bg-secondary p-1 rounded-full -right-1 top-2 border-2 border-white"
          ></div>
        </ion-button>
        <span class="font-medium text-sm">
          {{ store.discount.percent }}% off all menu items
        </span>
      </div>
      <swiper
        :modules="modules"
        :autoplay="false"
        :pagination="false"
        :zoom="true"
        @swiper="setSwiperInstance"
        @slideChange="onSlideChange"
        class="mt-1 onboarding"
      >
        <swiper-slide v-for="(menu, i) in menus" :key="i">
          <div class="ion-padding flex flex-col gap-6">
            <ProductCard v-for="(item, i) in 10" :key="i" />
          </div>
        </swiper-slide>
      </swiper>
    </ion-content>

    <MoreInfo :isOpen="moreInfoModal" @close="moreInfoModal = false" />
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
  IonHeader,
  IonContent,
  IonSpinner,
  IonButtons,
  IonButton,
  IonIcon,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonChip,
  //   IonGrid,
  //   IonRow,
  //   IonCol,
  IonRefresher,
  IonRefresherContent,
  onIonViewWillEnter,
} from "@ionic/vue";

import {
  chevronBack,
  // search,
  shareSocial,
  heart,
  heartOutline,
  bicycle,
  walk,
  star,
  gift,
} from "ionicons/icons";

import { Autoplay, Keyboard, Pagination, Navigation, Scrollbar } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";

import storeDB from "@/utils/stores.js";
import ProductCard from "@/components/Store/ProductCard.vue";
import MoreInfo from "@/components/Store/MoreInfo.vue";

import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { helperFunctions } from "@/composable/helperFunctions";

const { shareText, moveCenter } = helperFunctions;

const route = useRoute();

const modules = [Autoplay, Keyboard, Pagination, Navigation, Scrollbar];
const slides = ref();
const setSwiperInstance = (swiper) => {
  slides.value = swiper;
};

const onSlideChange = (e) => {
  console.log(e);
  activeMenu.value = e.activeIndex;
};

const moreInfoModal = ref(false);
const allStores = computed(() => storeDB);
const store = ref(null);
const deliveryOption = ref("delivery");

const reload = async (event) => {
  setTimeout(() => event.target.complete(), 500);
};

onIonViewWillEnter(async () => {
  const id = await route.params.id;
  store.value = allStores.value.find((el) => el.id == id);

  console.log(store.value, id);
});

onMounted(async () => {
  const id = await route.params.id;
  store.value = allStores.value.find((el) => el.id == id);
  console.log(store.value, id);
});

const changeDeliveryOption = (e) => {
  deliveryOption.value = e.detail.value;
};

const shareStore = () => {
  shareText({
    title: `Share ${store.value.name}`,
    text: "",
    url: `https://www.gofer.ng/store/1`,
    dialogTitle: `Share ${store.value.name}`,
  });
};

const isFavourite = ref(false);
const closed = computed(() => {
  let isClose = false;
  const currentHour = new Date().getHours();

  const openingHour = store.value && store.value.workingHours.opening;
  const closingHour = store.value && store.value.workingHours.closing;

  if (store.value && store.value.storeClosed) {
    isClose = true;
  } else if (currentHour >= closingHour || currentHour < openingHour) {
    isClose = true;
  }
  //   isClose = false;

  return isClose;
});

const activeMenu = ref(0);
const menus = ref([
  {
    title: "All",
  },
  {
    title: "Swallowing",
  },
  {
    title: "Proteins",
  },
  {
    title: "Slides",
  },
  {
    title: "Soup",
  },
  {
    title: "Specials",
  },
  {
    title: "Peppersoups",
  },
]);

const selectMenu = (e, index) => {
  console.log(e);
  activeMenu.value = index;
  slides.value.slideTo(index);
  moveCenter(e);
};
</script>

<style scope>
ion-chip.store {
  border-radius: 7px !important;
  padding: 20px 8px;
}

ion-segment.custom {
  border: 1px solid #dfdfdf;
  border-radius: 14px;
  background: #ffffff;
}

ion-segment-button.custom::part(indicator-background) {
  /* background: #08a391; */
  background: var(--ion-color-primary);
}

/* iOS styles */
ion-segment-button.ios.custom::part(native) {
  color: var(--ion-color-primary);
}

.segment-button-checked.ios.custom::part(native) {
  color: #fff;
}

ion-segment-button.ios.custom::part(indicator-background) {
  border-radius: 12px;
}

.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.no-scrollbar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

/* .animation {
  transition: border, background-color, 0.3s ease-in;
} */
</style>
