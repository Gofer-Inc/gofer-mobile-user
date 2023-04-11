<template>
  <div class="relative">
    <div class="flex flex-col gap-6 ion-padding">
      <swiper
        :modules="modules"
        :autoplay="true"
        :pagination="true"
        :zoom="true"
        :space-between="10"
        :slidesPerView="1"
        @swiper="setSwiperInstance"
        class="w-full"
        v-if="packageImages"
      >
        <swiper-slide v-for="(url, i) in packageImages" :key="i">
          <div
            class="h-44 w-full rounded-2xl border-2 border-primary-light rounded-xl overflow-hidden"
          >
            <img
              style="width: 100% !important; height: 100% !important"
              :src="url"
              alt=""
              class="w-full object-cover"
            />
          </div>
        </swiper-slide>
      </swiper>
      <div class="flex flex-col gap-4">
        <div class="flex gap-4" v-for="(item, i) in packageData" :key="i">
          <div class="mt-1">
            <ion-icon
              :icon="item.icon"
              color="primary"
              class="text-2xl"
            ></ion-icon>
          </div>

          <div class="flex w-full flex-col line-clamp-3 text-sm text-dark-200">
            <div class="text-lg text-dark-300 items-center w-full">
              {{ item.title }}
            </div>
            <div v-if="item.description" class="line-clamp-2">
              {{ item.description }}
            </div>
            <div v-if="item.phone" class="flex items-center justify-between">
              <div>
                {{ item.phone }}
              </div>

              <div v-if="item.phone">
                <a
                  target="_blank"
                  :href="`tel:${item.phone}`"
                  class="flex gap-1 items-center ion-activatable overflow-hidden relative px-2 rounded-xl"
                >
                  <ion-icon
                    class="text-xl"
                    :icon="call"
                    color="primary"
                  ></ion-icon>
                  <span class="text-dark-300 capitalize"> Call </span>
                  <ion-ripple-effect
                    class="text-primary-light"
                  ></ion-ripple-effect>
                </a>
              </div>
            </div>
            <div v-if="item.email" class="">
              {{ item.email }}
            </div>
            <div v-if="item.name" class="font-medium">
              {{ item.name }}
            </div>
            <div v-if="item.address" class="line-clamp-2">
              {{ item.address }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { IonIcon, IonRippleEffect } from "@ionic/vue";
import { cube, call, location, person } from "ionicons/icons";

import { Autoplay, Keyboard, Pagination, Navigation, Scrollbar } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";

import { computed, ref } from "vue";

const props = defineProps({
  package: {
    type: Object,
    default: () => ({}),
  },
});

const modules = [Autoplay, Keyboard, Pagination, Navigation, Scrollbar];
const slides = ref();
const setSwiperInstance = (swiper) => {
  slides.value = swiper;
};

const packageData = computed(() => {
  const packageDetails = props.package && props.package;
  return [
    {
      title: "Package",
      description: packageDetails && packageDetails.description,
      icon: cube,
    },
    {
      title: "Pick up Address",
      description:
        packageDetails &&
        packageDetails.receiver &&
        packageDetails.receiver.address,
      icon: location,
    },
    {
      title:
        packageDetails &&
        packageDetails.receiver &&
        packageDetails.receiver.name,
      phone:
        packageDetails &&
        packageDetails.receiver &&
        packageDetails.receiver &&
        packageDetails.receiver.phoneNumber,
      email:
        packageDetails &&
        packageDetails.receiver &&
        packageDetails.receiver.email,
      icon: person,
    },
    {
      title: "Sender",
      name:
        packageDetails && packageDetails.sender && packageDetails.sender.name,
      address:
        packageDetails &&
        packageDetails.sender &&
        packageDetails.sender.address,
      icon: person,
    },
  ];
});

console.log("ADFADFAJ", packageData.value);

const packageImages = computed(() => props.package && props.package.images);
</script>

<style scope>
.zigzag {
  background-image: url("@/assets/icon/zigzag.svg");
  background-position: center top;
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
