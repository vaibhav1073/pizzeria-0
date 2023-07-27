import React from "react";
import { useSelector,useDispatch } from "react-redux";
import "./ToppingsDropdown.css";
import { insertTopping,deleteTopping } from "../services/slices/sortFilterSlice";

export default function ToppingsDropdown() {
    const dispatch=useDispatch();
    const toppingsArr = useSelector((state) => state.pizza.pizzas.toppings);
    // const toppingtobeAdded=useSelector((state)=>state.sortFilter.searchByToppings);
    
    function editToppingsArray(event,toppingName){
        // event.stopPropagation();
        if(event.target.checked)dispatch(insertTopping(toppingName))
        else{
            dispatch(deleteTopping(toppingName))
        }
        console.log(event.target.checked)
    }

  return (
    <>
      <div className="dropdown container">
        <button
          className=" border dropdown-toggle form-select"
          type="button"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Filter by Toppings
        </button>
        <div
          className="dropdown-menu toppings-container"
          aria-labelledby="dropdownMenuButton"
        >
          {toppingsArr.map((topping) => (
            <div className="container shadow-sm mb-2" key={Math.random()}>
              <span className="dropdown-item m-0">{topping}</span>
              <input
                type="checkbox"
                className="form-check-input"
                onChange={(e) =>  editToppingsArray(e,topping)}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
