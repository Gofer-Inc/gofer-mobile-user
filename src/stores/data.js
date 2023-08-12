//store can be defined similar to the composition API setup, but it doesn't work as expected.
import { defineStore } from "pinia";

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
      // console.log(this.$http)
      // try {
      //   const res = await this.$http({
      //     endpoint: "GetRestaurants",
      //     httpMethod: "get",
      //   });
      //     this.restaurants = res,
      //     console.log(res);
      // } catch (error) {
      //   console.log(error.message)
      // }
    }
 
  },
  persist: true,
});
