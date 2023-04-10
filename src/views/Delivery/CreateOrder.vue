<template>
  <ion-page>
    <gNav title="Create an Order" />
    <ion-content fullscreen>
      <div class="ion-padding flex flex-col gap-6 pb-10">
        <gFile
          @fileUrl="args.files = $event"
          @imgUrl="args.images = $event"
          title="Package Photo"
        />
        <gInput
          @click="fromModal = true"
          appendIcon="location"
          v-model="args.senderAddress"
          label="Where from?"
          :error="errorRules.senderAddress"
          clearInput
        />
        <gTextArea
          appendIcon="cube"
          v-model="args.description"
          label="Description"
          :error="errorRules.description"
        />
        <gInput
          v-for="(item, i) in inputData"
          :key="i"
          @click="item.action"
          :appendIcon="item.appendIcon"
          v-model="args[item.input]"
          :label="item.label"
          :error="errorRules[item.error]"
          :clearInput="item.isClear"
        />

        <gButton @click="checkout" block>Confirm Order</gButton>
      </div>
    </ion-content>

    <gAddress
      :isOpen="fromModal"
      @address="args.senderAddress = $event"
      @close="fromModal = false"
    />
    <gAddress
      :isOpen="toModal"
      @address="args.receiverAddress = $event"
      @close="toModal = false"
    />

    <gCheckout
      :package="args"
      :isOpen="checkoutModal"
      @close="checkoutModal = false"
    />
  </ion-page>
</template>

<script setup>
import { IonPage, IonContent } from "@ionic/vue";
import { reactive, ref } from "vue";
// import { chevronBack, notifications, add } from "ionicons/icons";
import { helperFunctions } from "@/composable/helperFunctions";
const { processNumber, validateEmail } = helperFunctions;

const checkoutModal = ref(false);
let fromModal = ref(false);
let toModal = ref(false);

const args = reactive({
  files: [],
  images: [],
  description: "",
  senderAddress: "",
  senderName: "John Doe",
  senderPhoneNumber: "+234810813904",
  senderEmail: "johndoe@gmail.com",
  receiverAddress: "",
  receiverName: "",
  receiverPhoneNumber: "",
  receiverEmail: "",
});

const errorRules = reactive({
  receiverAddress: "",
  receiverPhoneNumber: "",
  receiverEmail: "",
  receiverName: "",
  senderAddress: "",
});

const inputData = ref([
  {
    label: "Where to?",
    input: "receiverAddress",
    appendIcon: "location",
    error: "receiverAddress",
    isClear: true,
    action() {
      toModal.value = true;
    },
  },
  {
    label: "Receiver's Name",
    input: "receiverName",
    appendIcon: "person",
    error: "receiverName",
    isClear: false,
    action: null,
  },
  {
    label: "Receiver's Phone Number",
    input: "receiverPhoneNumber",
    appendIcon: "call",
    error: "receiverPhoneNumber",
    isClear: false,
    action: null,
  },
  {
    label: "Receiver's Email (Optional)",
    input: "receiverEmail",
    appendIcon: "mail",
    error: "receiverEmail",
    isClear: false,
    action: null,
  },
]);

function validateForm() {
  let checkNumber =
    isNaN(args.receiverPhoneNumber.trim()) ||
    (processNumber(args.receiverPhoneNumber) &&
      processNumber(args.receiverPhoneNumber).length !== 13);

  if (args.senderAddress.trim() === "") {
    errorRules.senderAddress = "Please fill in sender's address";
    return false;
  } else if (args.description.trim() === "") {
    errorRules.description = "Please fill in the description";
    return false;
  } else if (args.receiverAddress.trim() === "") {
    errorRules.receiverAddress = "Please fill in receiver's address";
    return false;
  } else if (args.receiverName.trim() === "") {
    errorRules.receiverName = "Please fill in receiver's name";
    return false;
  } else if (args.receiverPhoneNumber.trim() === "") {
    errorRules.receiverPhoneNumber = "Please fill in receiver's phone number";
    return false;
  } else if (checkNumber !== false) {
    errorRules.receiverPhoneNumber = "Phone number badly formatted";
    return false;
  } else if (args.receiverEmail && !validateEmail(args.receiverEmail)) {
    errorRules.receiverEmail = "Email is badly formated";
    return false;
  } else {
    //Reset Error
    Object.keys(errorRules).forEach((key) => {
      errorRules[key] = false;
    });

    return true;
  }
}

const checkout = () => {
  if (validateForm()) {
    console.log(args);

    checkoutModal.value = true;
  }
};
</script>

<style></style>
