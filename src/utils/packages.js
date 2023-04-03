import iphone from "@/assets/images/iphone.png";
import mac from "@/assets/images/mac.png";

let packages = [
    {
      description: "Iphone 14 pro max",
      receive:{
        name:'Jake Williams',
      address:'Nostalgea Cinemas, Opposite Etegwe School Road Along, express way, Isaac Adaka Borough',
      phoneNumber:'+234810813904',
      email:'jakewilliams@gmail.com',
      },

      sender:{
        name:'John Doe',
        address:'Lagos, Island',
        phoneNumber:'+234810813904',
        email:'johndoe@gmail.com'
      },

      rider:{
        name:'Darrell Steward',
        address:'Lagos, Island',
        phoneNumber:'+234810813904',
        email:'darrelsteward@gmail.com'
      },

      createdAt:'Apr 1, 2023',
      orderNo:'4629402',
      status:'Delivered',
      
      totalCost:5000,
      vat:500,
      deliveryCost:4500,
      images:[iphone, mac],
      _id:1

    },
    {
      description: "Mac Book M1, Air pod pro",
      receive:{
        name:'Jake Williams',
      address:'Nostalgea Cinemas, Opposite Etegwe School Road Along, express way, Isaac Adaka Borough',
      phoneNumber:'+234810813904',
      email:'jakewilliams@gmail.com',
      },

      sender:{
        name:'John Doe',
        address:'Lagos, Island',
        phoneNumber:'+234810813904',
        email:'johndoe@gmail.com'
      },

      rider:{
        name:'Darrell Steward',
        address:'Lagos, Island',
        phoneNumber:'+234810813904',
        email:'darrelsteward@gmail.com'
      },

      createdAt:'Mar 31, 2023',
      orderNo:'4193402',
      status:'Received',

      totalCost:7500,
      vat:500,
      deliveryCost:7000,
      images:[mac, iphone],
      _id:2

    },
   
    
  ]

  export default packages;