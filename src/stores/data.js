//store can be defined similar to the composition API setup, but it doesn't work as expected.
import { defineStore } from "pinia";
import http from "@/service/https";

export const useDataStore = defineStore("main", {
  state: () => ({
    name: "Gofer",
    isLoggedIn: false,
    user:null,
    wallet:null,
    activeAddress:null,

    restaurantTypes:null,
    restaurants:[],
    restaurant:null,
    categories:[],
    products:[],

    cart:[],
    cartRestaurant:null,
    activePlateId:1,

    deliveryType:'delivery',
    orders:[],
    order:null,

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
    getUser: (state) => state.user,
    getRestaurantByID : state => id => {
      const restaurants = state.restaurants 
      return restaurants ? restaurants.filter(el => el.id == id) : null
    },
  },
  actions: {
    set({ type, data }) {
      this[type] = data;
    },

    setToast({isOpen = true, type ='success', position = 'top', message = '', duration =3000}){
      this.toast = {isOpen, type, position, message, duration}
    },

    async setRestaurants(){
      try {
        const res = await http({
          endpoint: "GetRestaurants",
          httpMethod: "get",
        });
          this.restaurants = res,
          console.log(res);
      } catch (error) {
        console.log(error.message)
      }
    },
    async initCateogories (storeID) {
      try {
        const res = await http({
          endpoint: "GetCategories",
          httpMethod: "get",
          suffix: storeID, //restaurant Id
        });
    
          this.categories = res,
    
        console.log("Categories", res);
      } catch (error) {
        console.log(error.message);
      }
    },
    async initProducts (storeID) {
      try {
        const res = await http({
          endpoint: "GetProducts",
          httpMethod: "get",
          suffix: storeID, //restaurant Id
        });
    
          this.products = res,
   
        console.log("Products", res);
      } catch (error) {
        console.log(error.message);
      }
    }
 
  },
  persist: true,
});
