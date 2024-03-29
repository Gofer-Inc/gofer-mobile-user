import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import router from './router';
import http from './service/https'
import 'animate.css'


import { IonicVue } from '@ionic/vue';
import { registerComponents } from "./utils/components.js";

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "@ionic/vue/css/ionic-swiper.css";

import 'primeicons/primeicons.css';

/* Theme variables */
import './theme/variables.css';

import "./index.css";

const app = createApp(App)


const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

  app.use(IonicVue)
  app.use(router)
  app.use(pinia);
  app.use(http)

  registerComponents(app);
  
router.isReady().then(() => {
  app.mount('#app');
});