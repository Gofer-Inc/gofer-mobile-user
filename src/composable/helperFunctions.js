
import { Toast } from "@capacitor/toast";
import { Clipboard } from "@capacitor/clipboard";
import { Share } from "@capacitor/share";
import { useDataStore } from "@/stores/data";
import { Browser } from "@capacitor/browser";
import dayjs from 'dayjs'

export const helperFunctions = {
  truncateAmount(amount) {
    try {
      // Truncate finalAmount to 2 decimal places without rounding up
      if (amount === undefined || amount === null) {
        return 0;
      }
      const truncatedAmount = Math.trunc(amount * 100) / 100;
      return truncatedAmount;
    } catch (error) {
      console.error("error:", error);
      return 0;
    }
  },

  formatAmount(amount) {
    try {
      if (
        amount === undefined ||
        amount === null ||
        amount === 0 ||
        isNaN(amount)
      ) {
        return "₦0.00";
      }
      let formatedAmount = parseInt(amount);
      formatedAmount = amount.toLocaleString("en-NG", {
        style: "currency",
        code: "NG",
        currency: "NGN",
      });

      return formatedAmount;
    } catch (error) {
      console.error("error:", error);
      return 0;
    }
  },

  processNumber(phoneNumber) {
    if (phoneNumber) {
      let phone = phoneNumber;
      let firstDigit = phone.charAt(0);
      if (firstDigit == "0") {
        let formatted = phone.replace("0", "234").replace(/\s+/g, "");
        return formatted;
      } else if (firstDigit == 2) {
        let formatted = phone.replace(/\s+/g, "");
        return formatted;
      } else if (firstDigit == "+") {
        let formatted = phone.substring(1).replace(/\s+/g, "");
        return formatted;
      }
    } else {
      return "";
    }
  },

  validateEmail(email) {
    if (email) {
      return email.match(
        /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
      );
    }
  },

  validatePassword(password){
    if(password){
      const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d\s])[\s\S]{8,}$/;
      return regex.test(password);
    }
  },

  validatePhone(phone) {
    // if (phone.trim() == "") {
    //   return false;
    // }
    if (phone.length) {
      if (phone.charAt(0) == 0 && phone.length !== 11) {
        return false;
      } else if (phone.charAt(0) == 2 && phone.length !== 13) {
        return false;
      } else {
        // errorRules.email = false;
        // errorRules.pin = false;

        return true;
      }
    }
  },

  calculatePercentage(num, per) {
    const result = (Number(num) / 100) * Number(per);
    return result;
  },

  
  formatDate(date) {
    return dayjs(date).format('DD/MMM/YYYY')
  },


  async showToast(type, message, duration = 3000) {
   
    const store = useDataStore()
    store.setToast({
      isOpen:true,
      type: type.toLowerCase(),
      message,
      duration
    })
  },

  async copyText(text, message = 'Copied to clipboard') {
    const store = useDataStore()
    await Clipboard.write({
      string: text,
    });

    store.setToast({
      isOpen:true,
      type : 'success',
      message
    })
  },

  async shareText({ title, text, url, dialogTitle, files }) {
    await Share.share({
      title,
      text,
      url,
      files,
      dialogTitle,
    });
  },

   moveCenter  (e)  {
    const element = e.target;
  
    element.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "center",
    });
  
    e.preventDefault();
  },

  async openBrowser(url, style, action ) {
    Browser.removeAllListeners()
    style = style == '' | style == undefined ? 'fullscreen' : style
    // const toolbarColor ='#094938'
   await Browser.open({ url, presentationStyle: style });
   Browser.addListener('browserFinished', action)
  },

  async openLiveChat() {
    await Browser.open({
      url: "https://jivo.chat/ZfJMQ6q8Km",
      presentationStyle: "fullscreen",
      windowName: "Live Chat With Us",
    });
  },

};
