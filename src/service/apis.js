export default {
    // AUTH
    SignIn : '/auth/signin',
    SignUp:'/auth/signup',
    VerifyEmail:'/auth/verify-email',
    CompleteSignUp:'/auth/complete-signup',
    ForgotPassword:'/auth/forgot-password',
    ResetPassword:'/auth/reset-password',

    //USER
    GetUser: '/user', //Takes in email as suffix eg. /user/email
    UpdateUser: '/user', //Put
    DeleteUser: '/user', //Delete takes an ID as suffix eg. /user/id
    AddAddress: '/user/address', //Post
    UpdateAddress: '/user/address', //Put takes an ID as suffix eg. /addressId

    //ORDER
    CreateOrder: '/order', //Post
    GetUserOrders: '/order/user', //Get
    GetOrderById: '/order', //Get takes in a orderId as suffix
    UpdateOrderStatus: '/order', //Put takes in a /id/status as suffix
    UpdateOrderPayment: '/order', //Put takes in a /id/status as suffix

    //WALLET
    GetWallet: '/wallet', //Get takes in a wallet id as suffix /wallet/walletId
    FundWallet: '/wallet/initialize',  //Post takes in a referrence as suffix /wallet/fund/trxRef


    //RESTAURANTS
    GetRestaurantTypes : '/settings/restaurantTypes', //Get you can pass in a suffix :typeId 

    GetRestaurants:'/restaurant',
    GetRestaurantsByLocation:'/restaurant/location', //Get you can pass in a suffix :longitude/:latitude/:radius
    GetRestaurantsByType:'/restaurant/type', //Get you can pass in a suffix :typeId 
    AddFavourite:'/restaurant/favourite', //Post you can pass in a suffix :restaurantId 

    GetCoupons:'/restaurant/coupon', // Get Takes in restaurantID as suffix eg. /restaurantId
    CheckCoupons:'/restaurant/coupon/check', // Get Takes in restaurantID as suffix eg. /code/restaurantId/total
    
    GetCategories:'/menu/menu-item/categories', //Takes in restaurantID as suffix eg. /restaurantId
    GetCategoryByID:'/menu/category', //Takes in categoryID as suffix eg. /categoryId
    
    AddProduct: '/menu/menu-item',
    GetProducts:'/menu/menu-item/restaurants', //Takes in restaurantID as suffix eg. /restaurantId

    //NOTIFICATION
    NotificationToken : '/user/notification', // Put


}