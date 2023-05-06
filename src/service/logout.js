import { Preferences } from "@capacitor/preferences";
import { useDataStore } from "@/stores/data";
// import router from "@/router";

export default async () => {
    const store = useDataStore();
    await Preferences.remove({ key: "token" })


    store.$patch({
        isLoggedIn: false,
      });

    store.$reset();

}