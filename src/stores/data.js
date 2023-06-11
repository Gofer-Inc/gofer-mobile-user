//store can be defined similar to the composition API setup, but it doesn't work as expected.
import { defineStore } from "pinia";

export const useDataStore = defineStore("main", {
  state: () => ({
    name: "Gofer",
    count: 0,
    isLoggedIn: false,
    user:null,

    toast:{
      isOpen:false,
      type:'success',
      position:'top',
      message:'',
      duration: 3000,
    }
  }),

  getters: {
    getToast: (state) => state.toast,
    getLogin: (state) => state.isLoggedIn,
    getUser: (state) => state.user
  },
  actions: {
    set({ type, data }) {
      this[type] = data;
    },

    increment() {
      this.count++;
    },

    setToast({isOpen = true, type ='success', position = 'top', message = '', duration =3000}){
      this.toast = {isOpen, type, position, message, duration}
    },
 
  },
  persist: true,
});
