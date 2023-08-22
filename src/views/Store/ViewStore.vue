<template>
  <ion-page v-if="dstore">
    <ion-header mode="ios" class="bg-white">
      <gNav
        borderless
        :showBackButton="false"
        color="white"
        class="relative pt-3"
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
        <div
          class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform"
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

      <div
        class="ion-padding mt-2 flex flex-col gap-3 border-b border-outline text-dark-400"
      >
        <div class="flex items-center justify-between">
          <span class="text-2xl font-medium text-dark-400">
            {{ dstore.name }}</span
          >
          <ion-icon
            :color="isFavourite ? 'secondary' : ''"
            class="text-2xl"
            @click="isFavourite = !isFavourite"
            :icon="isFavourite ? heart : heartOutline"
          />
        </div>
        <div class="-mt-1 flex items-center gap-2 text-xs">
          <span class="font-medium">
            {{
              dstore.location && dstore.location.city && dstore.location.city
            }}
            {{
              dstore.location && dstore.location.state && dstore.location.state
            }}
          </span>
          <span class="font-medium">{{ 4.5 }}</span>
          <ion-icon class="text-md" color="primary" :icon="star" />
          <span>{{ 200 }}+ Ratings</span>
          <!-- <gButton
            @click="moreInfoModal = true"
            size="small"
            fill="clear"
            class="m-0 -ml-2 -mt-2 p-0 text-xs underline"
            >More Info</gButton
          > -->
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <div v-if="false" class="flex items-center gap-2">
              <img src="@/assets/icon/naira-2.svg" alt="" />
              <div class="flex flex-col text-sm">
                <span class="font-medium text-dark-400">Free</span>
                <span class="-mt-1 text-xs text-dark-200">Delivery</span>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <img src="@/assets/icon/timer.svg" alt="" />
              <div class="flex flex-col text-sm">
                <span class="font-medium text-dark-400">25 - 30</span>
                <span class="-mt-1 text-xs text-dark-200">Minutes</span>
              </div>
            </div>
          </div>

          <div class="text-center text-xs text-error">
            <ion-chip
              v-if="closed"
              color="danger"
              class="store border border-error"
            >
              <ion-label class="flex flex-col py-1 text-left text-xs"
                ><span class="font-medium">CLOSED</span>
                <div>
                  Opens at
                  <span class="font-medium">{{ "6:00" }}AM</span>
                </div>
              </ion-label>
            </ion-chip>

            <div></div>
          </div>
        </div>

        <div v-if="false" class="flex items-center gap-2">
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
          v-if="!loading"
          class="animation no-scrollbar -mb-1 mt-3 flex items-center gap-1 overflow-x-auto pb-1 text-xs"
        >
          <div
            @click="selectMenu($event, i)"
            :class="
              activeMenu == i
                ? 'border border-primary bg-orange-50 text-primary'
                : 'text-dark-300'
            "
            class="rounded-full px-3 py-1"
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
        v-if="false"
        class="flex items-center justify-center border border-primary-light bg-primary-lighter p-2"
      >
        <ion-button
          fill="clear"
          class="animate__animated animate__rubberBand animate__delay-4s animate__infinite relative m-0"
        >
          <ion-icon color="primary" :icon="gift"></ion-icon>
          <div
            class="absolute -right-1 top-2 rounded-full border-2 border-white bg-secondary p-1"
          ></div>
        </ion-button>
        <span class="text-sm font-medium"> {{ 20 }}% off all menu items </span>
      </div>

      <div v-if="loading" class="p-4 text-center">
        <ion-spinner name="lines" color="primary"></ion-spinner>
      </div>

      <swiper
        :modules="modules"
        :autoplay="false"
        :pagination="false"
        :zoom="true"
        @swiper="setSwiperInstance"
        @slideChange="onSlideChange"
        class="onboarding mt-1"
        v-else
      >
        <swiper-slide v-for="(menu, i) in menus" :key="i">
          <div class="ion-padding flex flex-col gap-6">
            <ProductCard v-for="(item, i) in 10" :key="i" />
          </div>
        </swiper-slide>
      </swiper>
    </ion-content>
  </ion-page>
  <ion-page v-else>
    <ion-content class="ion-padding">
      <div class="flex h-full w-full items-center justify-center">
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

import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useDataStore } from "@/stores/data.js";
import { helperFunctions } from "@/composable/helperFunctions";

const { shareText, moveCenter } = helperFunctions;
const store = useDataStore();
const route = useRoute();
import http from "@/service/https";

const modules = [Autoplay, Keyboard, Pagination, Navigation, Scrollbar];
const slides = ref();
const setSwiperInstance = (swiper) => {
  slides.value = swiper;
};

const onSlideChange = (e) => {
  console.log(e);
  activeMenu.value = e.activeIndex;
};

const loading = ref(false);
const deliveryOption = ref("delivery");
const allStores = computed(() => store.restaurants);
const dstore = ref(null);

const reload = async (event) => {
  setTimeout(() => event.target.complete(), 500);
};

onIonViewWillEnter(async () => {
  initStore();
});

onMounted(async () => {
  initStore();
});

const initStore = async () => {
  const id = await route.params.id;
  dstore.value = allStores.value.find((el) => el.id == id);
  console.log(dstore.value, id);

  try {
    loading.value = true;
    await store.initCateogories(id);
    await store.initProducts(id);
    loading.value = false;
  } catch (error) {
    loading.value = false;
  }
};

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
  // const currentHour = new Date().getHours();

  // const openingHour = store.value && store.value.workingHours.opening;
  // const closingHour = store.value && store.value.workingHours.closing;

  // if (store.value && store.value.storeClosed) {
  //   isClose = true;
  // } else if (currentHour >= closingHour || currentHour < openingHour) {
  //   isClose = true;
  // }
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
