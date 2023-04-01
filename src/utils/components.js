
import TextInput from "@/components/Global/TextInput";
import SearchInput from "../components/Global/SearchInput";
import OtpInput from "@/components/Global/OtpInput";
import CustomButton from "../components/Global/CustomButton";
import TextArea from "@/components/Global/TextArea";
import SelectInput from "../components/Global/SelectInput";
// import PasswordKeyInput from "@/components/Global/PasswordKeyInput";
import NavBar from "../components/Global/NavBar";
import CustomModal from "../components/Global/CustomModal";
import FooterBar from "../components/Global/FooterBar";
// import OtpBox from "../components/Global/OtpBox";
import CustomLoader from "../components/Global/CustomLoader";
import PageTitle from "../components/Global/PageTitle";
import AddressModal from "../components/Global/AddressModal";

export const registerComponents = (app) => {
  app
    .component("gInput", TextInput)
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
};
