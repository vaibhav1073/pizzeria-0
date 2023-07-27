import React from 'react'
import {useParams,Link} from 'react-router-dom'

export default function Buyout() {
    let {pizzaName,variant,price}=useParams();
  return (
    <div>
        <h1 className="text-center">
            Unlimited Happiness
        </h1>
        <p className="text-center">Your Order for a {variant} sized {pizzaName} value of {price} </p>
        <div className="container btn-group">
            <Link  to="/" className="btn btn-warning shadow">Reorder something else</Link>
            <Link className="btn btn-warning shadow">proceed for Payment</Link>
            </div>
    </div>
  )
}
