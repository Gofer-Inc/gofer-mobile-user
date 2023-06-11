
import TextInput from "@/components/Global/TextInput.vue";
import SearchInput from "../components/Global/SearchInput.vue";
import OtpInput from "@/components/Global/OtpInput.vue";
import CustomButton from "../components/Global/CustomButton.vue";
import TextArea from "@/components/Global/TextArea.vue";
import SelectInput from "../components/Global/SelectInput.vue";
// import PasswordKeyInput from "@/components/Global/PasswordKeyInput.vue";
import NavBar from "../components/Global/NavBar.vue";
import CustomModal from "../components/Global/CustomModal.vue";
import FooterBar from "../components/Global/FooterBar.vue";
// import OtpBox from "../components/Global/OtpBox.vue";
import CustomLoader from "../components/Global/CustomLoader.vue";
import CustomToast from "../components/Global/CustomToast.vue";
import PageTitle from "../components/Global/PageTitle.vue";
import AddressModal from "../components/Global/AddressModal.vue";
import FileInput from "../components/Global/FileInput.vue";
import CheckOut from "../components/Global/CheckOut.vue";
import zigzagLine from "../components/Global/zigzagLine.vue";

export const registerComponents = (app) => {
  app
    .component("gInput", TextInput)
    .component("gFile", FileInput)
    .component("gSearch", SearchInput)
    .component("gButton", CustomButton)
    .component("gNav", NavBar)
    .component("gFooter", FooterBar)
    .component("gOtp", OtpInput)
    .component("gModal", CustomModal)
    .component("gSelect", SelectInput)
    .component("gTextArea", TextArea)
    .component("gLoader", CustomLoader)
    .component("gTitle", PageTitle)
    .component("gAddress", AddressModal)
    .component("gCheckout", CheckOut)
    .component("gZigzag", zigzagLine)
    .component("gToast", CustomToast)
};
