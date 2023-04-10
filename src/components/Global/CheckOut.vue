<template>
  <gModal
    :isOpen="isOpen"
    @close="$emit('close')"
    type="full"
    title="Checkout"
    :spacing="false"
    showCloseButton
  >
    <ion-page>
      <ion-content fullscreen>
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

                <div
                  class="flex w-full flex-col line-clamp-3 text-base text-dark-200"
                >
                  <div
                    class="text-lg text-dark-300 flex justify-between items-center w-full"
                  >
                    <div>{{ item.title }}</div>
                    <div v-if="item.action">
                      <gButton
                        @click="item.action"
                        appendIcon="call"
                        size="small"
                        fill="clear"
                      >
                        <span class="text-dark-300 capitalize"> Call </span>
                      </gButton>
                    </div>
                  </div>
                  <div v-if="item.description" class="line-clamp-2">
                    {{ item.description }}
                  </div>
                  <div v-if="item.phone" class="">
                    {{ item.phone }}
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
      </ion-content>
      <gFooter :spacing="false" class="">
        <div class="zigzag w-full h-auto py-8 ion-padding flex flex-col gap-2">
          <div
            :class="est.title === 'Total (incl. VAT)' ? 'font-medium' : ''"
            class="flex items-center justify-between text-base"
            v-for="(est, i) in estimate"
            :key="i"
          >
            <span class="text-dark-300">{{ est.title }}</span>
            <span class="text-dark-400">{{ formatAmount(est.amount) }}</span>
          </div>

          <gButton class="my-4 mb-10" block @click="closeFN">Checkout </gButton>
        </div>
      </gFooter>
    </ion-page>
  </gModal>
</template>

<script setup>
import { IonPage, IonContent, IonIcon } from "@ionic/vue";
import { cube, location, person } from "ionicons/icons";

import { Autoplay, Keyboard, Pagination, Navigation, Scrollbar } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";

import { computed, ref } from "vue";
import { helperFunctions } from "@/composable/helperFunctions";

const { formatAmount } = helperFunctions;

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: "store",
  },
  package: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(["close"]);

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
      description: packageDetails.description,
      icon: cube,
    },
    {
      title: "Pick up Address",
      description: packageDetails.receiverAddress,
      icon: location,
    },
    {
      title: packageDetails.receiverName,
      phone: packageDetails.receiverPhoneNumber,
      email: packageDetails.receiverEmail,
      icon: person,
      action() {
        alert("Call Receiver");
      },
    },
    {
      title: "Sender",
      name: packageDetails.senderName,
      address: packageDetails.senderAddress,
      icon: person,
    },
  ];
});

const packageImages = computed(() => props.package && props.package.images);
const estimate = computed(() => {
  return [
    {
      title: "Estimate Deliver",
      amount: 4500,
    },
    {
      title: "Service Fee",
      amount: 500,
    },
    {
      title: "Total (incl. VAT)",
      amount: 5000,
    },
  ];
});
const closeFN = () => {
  emit("close");
};
</script>

<style scope>
.zigzag {
  background-image: url("@/assets/icon/zigzag.svg");
  background-position: center top;
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
