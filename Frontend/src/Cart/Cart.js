import React from 'react';
import { useSelector } from 'react-redux';
import CartEmpty from './CartEmpty';
import CartFilled from './CartFilled'

export default function Cart() {
  const cartItems = useSelector((state) => state.cart.items);
  const total=useSelector((state)=>state.cart.total);
// console.log(cartItems)
function emptyCart(){
  return (<CartEmpty />)
}
function mapTheCart(){

  return (<CartFilled  cart={cartItems}/>)
}
  return (
    <>
    {Object.keys(cartItems).length===0 || total===0 ?  emptyCart() : mapTheCart() }
    
    </>
    
  );
}


// {Object.keys(cartItems).map((key) => (
//   <div key={key}>
//     {/* Render the details of each item here */}
//     <p>{cartItems[key]}</p>
//   </div>
  
// ))}
// key is the number  obj[key].keys== faThLarge, samll , medium