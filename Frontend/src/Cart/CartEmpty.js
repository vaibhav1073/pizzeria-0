import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceFrown } from "@fortawesome/free-solid-svg-icons"

import { NavLink } from "react-router-dom";
import "./CartCard.css"
export default function CartEmpty() {
  return (
    <>
    <div className="container row mt-5 mx-auto text-center">
     <FontAwesomeIcon icon={faFaceFrown} beat className="fa-face-frown-something"  />
        <h1 className="mt-5 text-center">Oopsie! you cart seems to be empty
            </h1>
            <NavLink className="btn btn-warning btn-lg mt-4"  to="/" >Shop Now!</NavLink>
        
         </div>

   
    </>
  )
}

//<FontAwesomeIcon icon={faFaceFrown} beat style={{"--fa-primary-color": "#ffd43b", "--fa-secondary-color": "#ffd43b",}} />
   //this is the duotone of the 
