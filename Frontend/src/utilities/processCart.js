// const axios=require("axios")
import axios from "axios";
const headers=require("../utilitiesJSON/headerFiles")
export const processCart=async(amount)=>{
    postRequest(amount);
    
}
async function postRequest(amount){
    let  details={}
    await axios.post("http://localhost:8000/payment/checkout/",{amount:amount,headers:headers.header.headers})
    .then(res=>details={...res.data})
    .catch(err=>console.log(err));
    await axios.get("http://localhost:8000/payment/checkout/key",{headers:headers.header.headers})
    .then(res=>details.key_id=res.data.key_id)
    .catch(err=>console.log(err))
    console.log(details)
    openDialogBox(details.key_id,details.amount,details.id)
    }
   
    const openDialogBox=(key,amount,id)=>{
        var options = {
            "key": key, // Enter the Key ID generated from the Dashboard
            "amount": amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "Pizzerio",
            "description": "Test Transaction",
            "image": "https://e7.pngegg.com/pngimages/613/484/png-clipart-pizza-logo-illustration-pizza-logo-logo-free-logo-design-template-food.png",
            "order_id": id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "callback_url": "https://eneqd3r9zrjok.x.pipedream.net/",
            "prefill": {
                "name": "Gaurav Kumar",
                "email": "gaurav.kumar@example.com",
                "contact": "9000090000"
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#ffc107"
            }
        };
        var rzp1 = new window.Razorpay(options);
       
            rzp1.open();
    }
       
    