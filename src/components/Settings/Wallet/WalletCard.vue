<template>
  <div
    class="relative text-light grid h-[130px] grid-cols-1 gap-6 rounded-2xl bg-dark-400 p-5 pb-4"
  >
    <div class="flex items-center justify-between text-white">
      <span class="text-2xl font-semibold">
        {{ showBalance ? formatAmount(walletBalance) : "₦******" }}
      </span>

      <span @click="showBalance = !showBalance" class="text-xl">
        <i v-if="showBalance" class="pi pi-eye-slash"></i>
        <i v-else class="pi pi-eye"></i>
      </span>
    </div>

    <div>
      <span
        @click="fundWalletModal = true"
        class="flex cursor-pointer items-center gap-2 text-primary-light"
      >
        <i class="pi pi-plus"></i>
        Fund Wallet
      </span>
    </div>

    <!-- <span class="pointer-events-none absolute right-0 top-0">
      <img src="@/assets/icon/fade.svg" alt="" />
    </span> -->
  </div>

  <!-- <FundWallet :isOpen="fundWalletModal" @close="fundWalletModal = false" /> -->
</template>

<script setup>
// import FundWallet from "./FundWallet.vue";

import { helperFunctions } from "@/composable/helperFunctions";
import { ref } from "vue";
// import { useDataStore } from "@/stores/data.js";

// const store = useDataStore();
const { formatAmount } = helperFunctions;

const fundWalletModal = ref(false);
const showBalance = ref(true);
const walletBalance = ref(20000);
</script>

<style></style>
