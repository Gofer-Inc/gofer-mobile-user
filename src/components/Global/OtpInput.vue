<template>
  <ion-grid :fixed="true" class="">
    <ion-row class="flex items-center justify-around">
      <ion-col size="auto" v-for="i in inputs" :key="i.id">
        <input
          :id="String(i.id)"
          v-model="i.value"
          :value="i.value"
          :class="`${
            error
              ? 'border-error focus:border-error'
              : 'border-medium focus:border-primary focus:ring-primary'
          } ${inputClass}`"
          class="custom bg-white w-10 h-10 border text-center text-lg rounded-md font-medium text-heading focus:outline-none"
          @input="$emit('input', $event.target.value)"
          @keyup="otpInputKeyDown($event, i.id)"
          inputmode="numeric"
          @focus="inputClass = 'border-primary'"
          @blur="inputClass = 'border-medium'"
          required="true"
          :maxlength="maxlength"
          :type="type"
          ref="otpInput"
        />
      </ion-col>
    </ion-row>
    <ion-row v-if="error" class="-mt-1 text-error text-xs">
      <ion-col> {{ error }} </ion-col>
    </ion-row>
  </ion-grid>
</template>

<script setup>
import { IonGrid, IonCol, IonRow } from "@ionic/vue";
import { ref, onMounted } from "vue";

const props = defineProps({
  value: [String, Number],
  maxlength: {
    type: [String, Number],
    default: "1",
  },

  disabled: {
    type: Boolean,
    default: false,
  },

  placeholder: String,
  tokenLength: {
    type: [String, Number],
    default: 6,
  },
  text: String,
  type: {
    type: String,
    default: "text",
  },
  color: {
    type: String,
    default: "primary",
  },

  error: {
    type: [String, Boolean],
    default: false,
  },
});

const emit = defineEmits(["input"]);

onMounted(() => {
  console.log(props.maxlength);
  //remove last two objects from inputs array if tokenLength is equal to 4
  if (props.tokenLength == 4) {
    inputs.value.pop();
    inputs.value.pop();
    // console.log(inputs.value);
  }
});

const inputClass = ref("");
const array = ref([]);
const inputs = ref([
  {
    id: 1,
    type: "text",
    value: "",
    required: true,
  },
  {
    id: 2,
    type: "text",
    value: "",
    required: true,
  },
  {
    id: 3,
    type: "text",
    value: "",
    required: true,
  },
  {
    id: 4,
    type: "text",
    value: "",
    required: true,
  },
  {
    id: 5,
    type: "text",
    value: "",
    required: true,
  },
  {
    id: 6,
    type: "text",
    value: "",
    required: true,
  },
]);

const otp_input = ref("");

const otpInput = ref(null);

// function addRemoveBorder() {
//   inputClass.value = "";
// }

function otpInputKeyDown(event, id) {
  array.value.push(props.value);

  const inputs = otpInput.value;

  //   var n = id + 1;
  let arr = [];

  for (let i = 0; i < inputs.length; i++) {
    if (i !== props.tokenLength - 1 && event.key !== "Backspace") {
      if (inputs[i].value.length === 1) {
        inputs[i + 1].focus();
        arr[i] = inputs[i].value;
        continue;
      }
    } else if (id !== 0 && event.key == "Backspace") {
      if (inputs[i].value.length === 0 && i !== id) {
        inputs[i - 1].focus();
        break;
      }
    }
  }
  for (let val of inputs) {
    arr.push(val.value);
  }
  //remove first 5 items from array
  if (props.tokenLength == 6) {
    arr.splice(0, 5);
  } else if (props.tokenLength == 4) {
    arr.splice(0, 3);
  }

  //remove empty strings from array
  arr = arr.filter((el) => el !== "");

  if (
    arr.length == props.tokenLength &&
    inputs[props.tokenLength - 1].value.length == 1
  ) {
    //join the items in the array to form a string
    otp_input.value = arr.join("");

    emit("input", otp_input.value);
  }
}
</script>

<style scope>
ion-input.custom {
  display: inline-block;

  --padding-start: 13px;
  /* --padding-end: 50%; */
}
</style>
