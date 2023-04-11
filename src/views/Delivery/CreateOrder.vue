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
          v-model="args.sender.address"
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
          @click="toModal = true"
          appendIcon="location"
          v-model="args.receiver.address"
          label="Where to?"
          :error="errorRules.receiverAddress"
          clearInput
        />
        <gInput
          appendIcon="person"
          v-model="args.receiver.name"
          label="Receiver's Name"
          :error="errorRules.receiverName"
        />
        <gInput
          appendIcon="call"
          v-model="args.receiver.phoneNumber"
          label="Receiver's Phone Number"
          :error="errorRules.receiverPhoneNumber"
        />
        <gInput
          appendIcon="call"
          v-model="args.receiver.email"
          label="Receiver's Email"
          :error="errorRules.receiverEmail"
        />
        <gButton @click="checkout" block>Confirm Order</gButton>
      </div>
    </ion-content>

    <gAddress
      :isOpen="fromModal"
      @address="args.sender.address = $event"
      @close="fromModal = false"
    />
    <gAddress
      :isOpen="toModal"
      @address="args.receiver.address = $event"
      @close="toModal = false"
    />

    <gCheckout
      :packageData="args"
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

  sender: {
    address: "",
    name: "John Doe",
    phoneNumber: "+234810813904",
    email: "johndoe@gmail.com",
  },

  receiver: {
    address: "",
    name: "",
    phoneNumber: "",
    email: "",
  },
});

const errorRules = reactive({
  receiverAddress: "",
  receiverPhoneNumber: "",
  receiverEmail: "",
  receiverName: "",
  senderAddress: "",
});

function validateForm() {
  let checkNumber =
    isNaN(args.receiver.phoneNumber.trim()) ||
    (processNumber(args.receiver.phoneNumber) &&
      processNumber(args.receiver.phoneNumber).length !== 13);

  if (args.sender.address.trim() === "") {
    errorRules.senderAddress = "Please fill in sender's address";
    return false;
  } else if (args.description.trim() === "") {
    errorRules.description = "Please fill in the description";
    return false;
  } else if (args.receiver.address.trim() === "") {
    errorRules.receiverAddress = "Please fill in receiver's address";
    return false;
  } else if (args.receiver.name.trim() === "") {
    errorRules.receiverName = "Please fill in receiver's name";
    return false;
  } else if (args.receiver.phoneNumber.trim() === "") {
    errorRules.receiverPhoneNumber = "Please fill in receiver's phone number";
    return false;
  } else if (checkNumber !== false) {
    errorRules.receiverPhoneNumber = "Phone number badly formatted";
    return false;
  } else if (args.receiver.email && !validateEmail(args.receiver.email)) {
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
