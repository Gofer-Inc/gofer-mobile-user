<template>
  <div>
    <div class="text-sm">{{ title }}</div>
    <div class="flex flex-wrap items-center gap-2 mt-2">
      <div
        v-for="(url, i) in imageUrls"
        :key="url"
        class="w-24 h-24 border rounded-2xl overflow-hidden relative ion-activatable overflow-hidden"
      >
        <img :src="url" alt="" class="h-full w-full object-cover" />

        <div
          style="
            background: linear-gradient(
              0deg,
              rgba(0, 0, 0, 0.3),
              rgba(0, 0, 0, 0.3)
            );
          "
          class="absolute inset-0 flex items-center justify-center"
        >
          <ion-icon
            @click="clearFiles(i)"
            :icon="close"
            class="text-2xl"
            color="light"
          ></ion-icon>
          <ion-ripple-effect class="text-light"></ion-ripple-effect>
        </div>
      </div>

      <div
        @click="$refs.input.click()"
        class="ion-activatable overflow-hidden relative w-24 h-24 border border-dashed border-dark-100 rounded-2xl flex items-center justify-center"
      >
        <ion-icon :icon="add" class="text-2xl" color="medium"></ion-icon>
        <ion-ripple-effect class="text-outline"></ion-ripple-effect>
      </div>
    </div>
    <div class="text-error text-xs mt-2">{{ message }}</div>
  </div>

  <input
    v-show="hide === false"
    ref="input"
    :accept="allowedTypes.toString()"
    @change="previewFiles($event)"
    type="file"
    class="custom-file-input"
  />
</template>

<script setup>
import { IonIcon, IonRippleEffect } from "@ionic/vue";
import { add, close } from "ionicons/icons";

import { ref, computed } from "vue";
import { helperFunctions } from "@/composable/helperFunctions";

const props = defineProps({
  title: {
    type: String,
    default: "Add Image",
  },

  allowedTypes: {
    default: ["jpg"],
  },

  hint: {
    type: String,
    default: ``,
  },

  size: {
    type: [Number, String],
    default: 5000000,
  },

  max: {
    type: [String, Number],
    default: 3,
  },

  min: {
    type: [String, Number],
    default: undefined,
  },
});

const emit = defineEmits(["fileUrl", "imgUrl"]);

const { showToast } = helperFunctions;

let message = ref("");
let fileName = ref("");
let fileSize = ref("");
let imageUrls = ref([]);
let error = ref(false);
const inputFile = ref(null);
const input = ref(null);
const hide = ref(true);
const uploadFiles = ref([]);

defineExpose({ input });

const clearFiles = (index) => {
  input.value.value = null;
  fileName.value = "";
  fileSize.value = "";
  inputFile.value = null;
  imageUrls.value = imageUrls.value.filter((el, i) => i !== index);
  uploadFiles.value = uploadFiles.value.filter((el, i) => i !== index);

  emit("fileUrl", uploadFiles.value);
  emit("imgUrl", imageUrls.value);
};

function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

const allowedTypes = computed(() => {
  let allowedTypes = [];

  if (props.allowedTypes) {
    props.allowedTypes.forEach((el) => {
      if (el == "pdf") {
        allowedTypes.push("application/pdf");
      } else if (el == "jpg") {
        allowedTypes.push(
          "image/png",
          "image/jpeg",
          "image/gift",
          "image/webp"
        );
      } else if (el == "excel") {
        allowedTypes.push(
          "text/csv",
          "application/csv",
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          "application/vnd.ms-excel"
        );
      } else if (el == "word") {
        allowedTypes.push("application/msword");
      }
    });
  } else {
    allowedTypes = [
      "text/csv",
      "application/msword",
      "application/vnd.ms-excel",
      "application/vnd.ms-powerpoint",
      "text/plain",
      "application/pdf",
      "image/png",
      "image/jpeg",
      "image/gif",
      "application/csv",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];
  }
  return allowedTypes;
});

function previewFiles(e) {
  //   console.log(e.target.files[0], "FILE TARGET");
  if (imageUrls.value.length > parseInt(props.max) - 1) {
    message.value = `The maximum allowed is ${props.max}`;
    return false;
  } else {
    error.value = false;
    message.value = "";
    const file = e.target.files[0];
    inputFile.value = file;
    uploadFiles.value.push(file);
    console.log(file.type, "TYPEOFFILE");

    console.log(file.type);

    try {
      if (!allowedTypes.value.includes(file.type)) {
        message.value = "File type is wrong!!";
        inputFile.value = null;
        error.value = true;
        throw new Error(message.value);
      }

      if (file.size > parseInt(props.size)) {
        console.log(
          `Too large, max size allowed is ${parseInt(props.size) / 1000000}MB`
        );
        message.value = `Too large, max size allowed is ${
          parseInt(props.size) / 1000000
        }MB`;
        inputFile.value = null;
        error.value = true;
        // showToast(message.value)
        throw new Error(message.value);
      }

      const { name, size } = file;
      fileName.value = name;

      fileSize.value = formatBytes(size);
      let reader = new FileReader();

      reader.onloadend = (e) => {
        // data url
        imageUrls.value.push(e.target.result);
        // args.documentUrl = e.target.result;
      };
      reader.readAsDataURL(file);
      emit("fileUrl", uploadFiles.value);
      emit("imgUrl", imageUrls.value);
    } catch (e) {
      showToast(e.message);
    }
  }

  // url = URL.createObjectURL(file);
  // uploadToServer();
}
</script>

<style></style>
