
import { Toast } from "@capacitor/toast";
import { Clipboard } from "@capacitor/clipboard";
import { Share } from "@capacitor/share";

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

  
  formatDateString(date, arg) {
    let formattedDate;
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    if (date && date.length > 0 && date !== "N/A") {
      let dd = date.slice(8, 10);
      let mm = date.slice(5, 7);

      let yyyy = date.slice(0, 4);
      // if (dd < 10) {
      //   dd = "0" + dd;
      // }
      // if (mm < 10) {
      //   mm = "0" + mm;
      // }
      formattedDate =
        arg === "name"
          ? months[parseInt(mm.toString())] + " " + dd + ", " + yyyy
          : dd + "/" + mm + "/" + yyyy;
    } else {
      formattedDate = "N/A";
    }

    return formattedDate;
  },


  async showToast(text, position = "bottom") {
    await Toast.show({
      text: text,
      position,
    });
  },

  async copyText(text, message) {
    await Clipboard.write({
      string: text,
    });

    await Toast.show({
      text: message,
      duration: "long",
      position: "bottom",
    });
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
  }

};
