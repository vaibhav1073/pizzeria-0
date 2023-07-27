import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faIndianRupeeSign } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  increment,
  setShowAction,
  setShowAlertText,
} from "../services/slices/cartSlice";
import "./PizzaCard.css"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
export default function PizzaCard({ item }) {
  const [selectedValue, setSelectedValue] = React.useState("small");
  const [loaded, setLoaded] = React.useState(false);
  const loggedIn = useSelector((state) => state.user.loggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
    
  };
  function addToCart() {
    if (!loggedIn) {
      navigate("/signin");
      dispatch(setShowAction(true));
      dispatch(setShowAlertText("Kindly Login First")); //use a file for this one
    } else {
      let entry = [item._id, selectedValue, item.sizes[selectedValue]];
      dispatch(increment(entry));
      //set the text also, edit or something else
    }
    setTimeout(() => dispatch(setShowAction(false)), 2000);
  }

  useEffect(() => {
    const image = new Image();
    image.src = item.image;
    image.onload = setLoaded(true);
  }, [item.image]);

  return (
    <div>
      {loaded ? (
        <div
          className="card"
         
        >
          <img src={item.image} alt={`${item.name} `} />
          <div className="card-body shadow">
            <div className="justify-content-around d-flex aling-items-center">
              <h5 className="card-title">{item.name}</h5>

              {item.vegetarian ? (
                <img
                  width="30"
                  height="30"
                  src="https://img.icons8.com/color/48/vegetarian-food-symbol.png"
                  alt="vegetarian-food-symbol"
                />
              ) : (
                <img
                  width="30"
                  height="30"
                  src="https://img.icons8.com/color/48/non-vegetarian-food-symbol.png"
                  alt="non-vegetarian-food-symbol"
                />
              )}
            </div>
            <h6>Toppings</h6>
            <div className="container">
              {
                item.toppings.map(topping=>(
                  <span key={Math.random()}>{topping}</span>
                ))
              }
            </div>
            <div className="display-flex-container-column">
            <select onChange={handleSelectChange} className="form-select">
                <option value={`small`}>Small</option>
                <option value={`medium`}>Medium</option>
                <option value={`large`}>Large</option>
              </select>
              
               
              
            </div>
            <div className="cartbutton" onClick={addToCart} role="button">
                <div className="div-one" >
                <div> <FontAwesomeIcon icon={faIndianRupeeSign}/>{item.sizes[selectedValue]}</div>
                </div>
                <div className="div-two"><FontAwesomeIcon icon={faCartShopping}/></div>
                
              </div>
            
          </div>
        </div>
      ) : (
        <p>Hello frnd I am under water</p>
      )}
    </div>
  );
}
// <div className="container d-flex justify-content-around mt-4 row">
            //   <select onChange={handleSelectChange} className="form-select">
            //     <option value={`small`}>Small</option>
            //     <option value={`medium`}>Medium</option>
            //     <option value={`large`}>Large</option>
            //   </select>
            //   <div
            //     className="row container text-center d-flex justify-content-around btn btn-warning mt-2 "
            //     onClick={addToCart}
            //   >
            //     <p className="col col-sm col-md-4 my-0 text-dark">
            //       <FontAwesomeIcon icon={faIndianRupeeSign} />
            //       {item.sizes[selectedValue]}
            //     </p>
            //     <FontAwesomeIcon
            //       className="col col-sm col-md-2 mt-1 pl-5 text-dark"
            //       icon={faCartShopping}
            //     />
            //   </div>
            // </div> 
