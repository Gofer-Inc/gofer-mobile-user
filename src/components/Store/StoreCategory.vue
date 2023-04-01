<template>
  <div>
    <gTitle title="Category" text="See all" />

    <swiper
      :modules="modules"
      :autoplay="true"
      :pagination="false"
      :zoom="true"
      :slides-per-view="4"
      @swiper="setSwiperInstance"
      class="flex items-center gap-4"
    >
      <swiper-slide
        v-for="(category, i) in categories"
        :key="i"
        class="flex py-2 flex-col gap-2 text-sm font-medium"
      >
        <div
          class="w-20 h-20 border-2 border-primary-light rounded-2xl overflow-hidden flex"
        >
          <img :src="category.logo" alt="" class="h-full object-cover" />
        </div>
        <div class="text-center text-dark-300 text-sm">{{ category.name }}</div>
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

import img1 from "@/assets/images/img1.webp";
import img2 from "@/assets/images/img2.jpeg";
import img3 from "@/assets/images/img3.jpeg";
import img4 from "@/assets/images/img4.webp";

import { Autoplay, Keyboard, Pagination, Navigation, Scrollbar } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
import { reactive, ref } from "vue";

const modules = [Autoplay, Keyboard, Pagination, Navigation, Scrollbar];
const slides = ref();
const setSwiperInstance = (swiper) => {
  slides.value = swiper;
};

const categories = reactive([
  {
    logo: img1,
    name: "African",
  },
  {
    logo: img2,
    name: "Burgers",
  },
  {
    logo: img3,
    name: "Pizza",
  },
  {
    logo: img4,
    name: "Drinks",
  },
]);
</script>

<style></style>
