<template>
  <div class="relative">
    <div v-if="label" class="mb-2 text-sm">{{ label }}</div>
    <div class="relative z-20" :class="error || hint ? 'mb-4' : ''">
      <ion-item ref="item" class="selectInput text-heading">
        <ion-label
          v-if="appendIcon || appendSvg"
          :class="`${appendIcon ? 'mt-4' : ''} ${appendSvg ? 'mt-3' : ''}`"
        >
          <ion-icon
            v-if="!svgIcon && appendIcon"
            class="text-xl text-bodyNormal"
            :icon="allIcons[appendIcon]"
          ></ion-icon>

          <img v-if="appendSvg" :src="appendSvg" alt="" class="w-6" />
        </ion-label>
        <ion-input
          v-if="!showItems"
          :readonly="!showItems && !value.length"
          :placeholder="value && value.length ? '' : placeholder"
          @click="showItems = true"
          @focus="showItems = true"
          :class="[
            `${appendIcon ? 'ml-1' : ''} ${appendSvg ? 'ml-2' : ''}`,
            value && value.length ? 'text-bodyDark' : 'text-bodyNormal',
          ]"
          class="selectInput"
        >
          <span class="capitalize"> {{ getLabel(value) }}</span>
        </ion-input>
        <ion-input
          v-else
          v-model="searchQuery"
          @keyup="searchFunction"
          :readonly="!showItems && !value.length"
          :placeholder="placeholder"
          @click="showItems = true"
          @focus="showItems = true"
          :class="[
            `${appendIcon ? 'ml-1' : ''} ${appendSvg ? 'ml-2' : ''}`,
            value && value.length ? 'text-bodyDark' : 'text-bodyNormal',
          ]"
          class="selectInput"
        >
        </ion-input>

        <!-- readonly -->
        <ion-label style="margin-bottom: 0.1px" class="">
          <ion-icon
            class="text-xl text-bodyNormal"
            :icon="allIcons[showItems ? 'search' : 'chevronDown']"
          ></ion-icon>
        </ion-label>
      </ion-item>

      <div
        v-if="error"
        class="absolute text-xs font-medium text-error left-1 mt-1"
      >
        {{ error }}
      </div>
      <div
        v-if="hint && !error"
        style="text-transform: none"
        class="absolute text-xs font-medium text-warning left-1 my-1"
      >
        {{ hint }}
      </div>

      <div
        class="borderClassSelect pointer-events-none absolute top-0 left-0 w-full h-full p-4 z-10"
      ></div>
    </div>

    <div :class="absolute ? 'absolute mt-2' : ''" class="w-full z-50">
      <ion-content
        v-if="showItems && !autoHeight"
        color="white"
        :class="height"
        class="rounded-2xl shadow-md mt-2 overflow-scroll"
      >
        <ion-list lines="full" class="ion-margin-bottom mb-24 shadow-md">
          <ion-item
            v-for="option in optionData"
            :key="option.label"
            class=""
            @click="update(option)"
          >
            <ion-icon
              v-if="value === option.label"
              :icon="allIcons['checkmarkCircle']"
              color="success"
              size="small"
              slot="end"
            ></ion-icon>
            <ion-label
              :color="value === option.label ? 'success' : undefined"
              class="p-1 capitalize"
              >{{ option.label }}
            </ion-label>
          </ion-item>

          <ion-item v-if="showAddButton" @click="emitAdd">
            <ion-icon
              :icon="allIcons['add']"
              color="success"
              size="small"
              slot="end"
            ></ion-icon>
            <ion-label color="success" class="p-1 capitalize"
              >Add New
            </ion-label>
          </ion-item>
        </ion-list>
      </ion-content>
      <ion-list
        lines="full"
        v-if="showItems && autoHeight"
        class="optionsBox ion-margin-bottom mb-24 shadow-md pb-0"
      >
        <ion-item
          v-for="option in optionData"
          :key="option.label"
          class=""
          @click="update(option)"
        >
          <ion-icon
            v-if="value === option.label"
            :icon="allIcons['checkmarkCircle']"
            color="success"
            size="small"
            slot="end"
          ></ion-icon>
          <ion-label
            class="p-1 capitalize"
            :color="value === option.label ? 'success' : undefined"
            >{{ option.label }}</ion-label
          >
        </ion-item>

        <ion-item v-if="showAddButton" @click="emitAdd">
          <ion-icon
            :icon="allIcons['add']"
            color="success"
            size="small"
            slot="end"
          ></ion-icon>
          <ion-label color="success" class="p-1 capitalize">Add New </ion-label>
        </ion-item>
      </ion-list>
    </div>

    <div
      style="z-index: 10"
      v-if="absolute"
      @click="showItems = false"
      :class="!showItems ? 'pointer-events-none' : ''"
      class="fixed inset-0 h-screen"
    ></div>
  </div>
</template>

<script setup>
import {
  IonItem,
  IonLabel,
  IonIcon,
  IonInput,
  IonContent,
  IonList,
} from "@ionic/vue";

import * as allIcons from "ionicons/icons";
import { addIcons } from "ionicons";
import { computed, onMounted, ref, watch } from "vue";

const props = defineProps({
  value: {
    type: String,
    default: "",
  },
  height: {
    type: String,
    default: "h-56",
  },
  label: {
    type: [String, Boolean],
    default: false,
  },
  search: {
    type: Boolean,
    default: true,
  },
  appendIcon: {
    type: [String, Boolean],
    default: false,
  },
  appendSvg: {
    type: [String, Boolean],
    default: false,
  },

  absolute: {
    type: Boolean,
    default: true,
  },
  autoHeight: {
    type: Boolean,
    default: true,
  },
  placeholder: String,
  options: {
    type: Array,
    default() {
      return [];
    },
  },
  color: {
    type: [String, Boolean],
    default: "primary",
  },
  showAddButton: {
    type: Boolean,
    default: false,
  },
  error: {
    type: [String, Boolean],
    default: false,
  },
  hint: {
    type: [String, Boolean],
    default: false,
  },
});
const emit = defineEmits(["update", "appendAction", "prependAction", "addNew"]);

const showItems = ref(false);
const searchQuery = ref("");
const visibleLabel = ref("");

const watchValue = computed(() => props.value);
const watchProp = computed(() => props.options);
watch(watchProp, (newValue) => {
  optionData.value = newValue;
});

watch(
  watchValue,
  () => {
    if (watchValue.value && watchValue.value.length) {
      visibleLabel.value = watchProp.value.find(
        (pr) => pr.value === watchValue.value
      )?.label;
      console.log(visibleLabel.value);
    }
  },
  { immediate: true }
);

const optionData = ref([]);
function emitAdd() {
  emit("addNew");
}

function update(value) {
  showItems.value = false;
  searchQuery.value = "";
  visibleLabel.value = value.label;
  optionData.value = props.options;

  console.log(value);
  emit("update", value.value);
}

const getLabel = (val) => {
  console.log(props.options, val);
  if (val) {
    const option = props.options.find((el) => el.value == val);
    return option ? option.label : "";
  }
};

const colorName = computed(() => {
  if (props.error) {
    return showItems.value
      ? `var(--ion-color-danger)`
      : `var(--ion-color-danger)`;
  } else if (props.disabled) {
    return `var(--ion-color-light-shade)`;
  } else {
    return showItems.value
      ? `var(--ion-color-${props.color})`
      : `var(--ion-color-medium)`;
  }
});

onMounted(() => {
  // searchQuery.value = props.value;
  optionData.value = props.options;
  addIcons(allIcons);
});
function searchArrayObjects(arr, searchString) {
  return arr.filter((item) => {
    return item.label.toLowerCase().includes(searchString.toLowerCase());
  });
}
function searchFunction(e) {
  console.log(e.key);
  if (e.key === "Backspace") {
    optionData.value = props.options;
  }
  if (searchQuery.value.length) {
    optionData.value = searchArrayObjects(optionData.value, searchQuery.value);
  } else {
    optionData.value = props.options;
  }
  // console.log(e);
  // const name = e.target.value;
  // let data;
  // if (name.length) {
  //   if (e.key !== "Backspace") {
  //     data = props.options.filter((x) => {
  //       return String(x.value).toLowerCase().indexOf(name.toLowerCase()) > -1
  //         ? x.value
  //         : "";
  //     });
  //   } else {
  //     data = props.options.filter((x) => {
  //       return String(x.value)
  //         .toLowerCase()
  //         .indexOf(searchQuery.value.toLowerCase()) > -1
  //         ? x.value
  //         : "";
  //     });
  //   }

  //   if (data.length) {
  //     optionData.value = data;
  //     return data;
  //   }
  // } else {
  //   optionData.value = props.options;
  // }
}
</script>

<style scoped>
.borderClassSelect {
  border: 1.5px solid v-bind(colorName) !important;
  border-radius: 18px !important;
}

.optionsBox {
  border-radius: 18px !important;
  overflow: hidden !important;
}

ion-item.selectInput {
  border: none !important;
  border-radius: 16px !important;
  --border-color: #ffffff;

  padding-top: 1px !important;
  padding-bottom: 1px !important;
}

ion-input.selectInput {
  --border-color: v-bind(colorName);
  --padding-start: 0px !important;
  display: flex !important;
}

.item-has-focus {
  /* --highlight-background: #ffffff; */
  --border-color: #ffffff;
}
</style>
