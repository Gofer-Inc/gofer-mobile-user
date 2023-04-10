<template>
  <div>
    <gTitle title="Feature Restaurants" text="See All" />

    <swiper
      :modules="modules"
      :autoplay="false"
      :pagination="false"
      :zoom="true"
      :space-between="20"
      :slidesPerView="1.2"
      @swiper="setSwiperInstance"
      class=""
    >
      <swiper-slide v-for="(store, i) in featured" :key="i">
        <StoreCard :store="store" />
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup>
import storeDB from "@/utils/stores.js";

import { Autoplay, Keyboard, Pagination, Navigation, Scrollbar } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
import { computed, ref } from "vue";

const modules = [Autoplay, Keyboard, Pagination, Navigation, Scrollbar];
const slides = ref();
const setSwiperInstance = (swiper) => {
  slides.value = swiper;
};

import StoreCard from "@/components/Store/StoreCard.vue";

const featured = computed(() => storeDB.filter((el) => el.featured));
</script>

<style></style>
