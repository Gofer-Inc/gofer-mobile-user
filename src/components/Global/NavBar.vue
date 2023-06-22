<template>
  <ion-header
    v-if="empty"
    :loading="loading"
    :class="color == 'white' ? 'bg-white' : ''"
    class="Navbar ion-no-border"
  >
    <ion-toolbar
      :color="color ? color : undefined"
      :class="color == 'transparent' ? 'transparent' : ''"
      class="Navbar -mt-6"
    >
      <ion-title class="text-sm"> </ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-header
    v-else
    :class="`${borderless ? 'ion-no-border' : ''} ${
      color == 'white' ? 'bg-white' : ''
    }`"
    :translucent="translucent"
    :collapse="collapse"
    class="Navbar"
  >
    <ion-toolbar
      :color="color ? color : 'white'"
      :class="color == 'transparent' ? 'transparent' : ''"
      class="Navbar px-2"
    >
      <ion-buttons slot="start" v-if="showBackButton">
        <ion-back-button
          @click="handleBackButton"
          :color="dark ? 'light' : 'medium'"
          class="Navbar text-sm"
          :text="backButtonText"
          :icon="allIcons['chevronBack']"
        ></ion-back-button>
      </ion-buttons>
      <slot />
      <ion-title
        v-if="title.length"
        :class="dark ? `text-white` : 'text-heading'"
        class="Navbar font-medium capitalize"
      >
        {{ title }}
      </ion-title>
    </ion-toolbar>
    <ion-progress-bar v-if="loading" type="indeterminate"></ion-progress-bar>
  </ion-header>
</template>

<script setup>
import {
  IonHeader,
  IonToolbar,
  IonBackButton,
  IonButtons,
  IonTitle,
  IonProgressBar,
} from "@ionic/vue";
import * as allIcons from "ionicons/icons";
import { addIcons } from "ionicons";
import { onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps({
  type: {
    type: String,
    default: "header",
  },
  showBackButton: {
    type: Boolean,
    default: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  empty: {
    type: Boolean,
    default: false,
  },
  translucent: {
    type: Boolean,
    default: false,
  },
  collapse: {
    type: Boolean,
    default: false,
  },
  borderless: {
    type: Boolean,
    default: true,
  },

  color: {
    type: [String, Boolean],
    default: "white",
  },

  backButtonText: {
    type: String,
    default: "",
  },
  title: {
    type: String,
    default: "",
  },
  dark: {
    type: Boolean,
    default: false,
  },

  onClick: {
    type: [Function, Boolean],
    default: false,
  },
});

onMounted(() => {
  // Register all icons globally
  addIcons(allIcons);
});

const handleBackButton = () => {
  if (props.onClick) {
    props.onClick();
  } else {
    router.go(-1);
  }
};
</script>

<style scoped>
ion-header.Navbar {
  box-shadow: none !important;
}
ion-toolbar.Navbar .transparent {
  --background: transparent;
}
.md ion-title.Navbar {
  position: absolute;
  top: 0;
  left: 0;
  padding: 0 90px 1px;
  width: 100%;
  height: 100%;
  text-align: center;
}

/* .ios ion-back-button.Navbar {
  margin-left: 6px !important;
} */
</style>
