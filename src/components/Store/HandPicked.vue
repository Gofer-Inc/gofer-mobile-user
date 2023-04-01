<template>
  <div>
    <gTitle title="Handpicked for you" icon="heart" />

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
      <swiper-slide v-for="(store, i) in handpicked" :key="i">
        <StoreCard :store="store" />
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup>
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "@ionic/vue/css/ionic-swiper.css";

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

const handpicked = computed(() => storeDB.slice(0, 2));
</script>

<style></style>
