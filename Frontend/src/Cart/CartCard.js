import React from 'react'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDispatch } from 'react-redux'
import { cartIncrement,cartDecrement,deleteEntry } from '../services/slices/cartSlice'
import "./CartCard.css"

export default function CartCard({pizzaData,size,quantity}) {
    
    const dispatch=useDispatch()
    function incrementSmallPizza(){
        return dispatch(cartIncrement([pizzaData._id,size,pizzaData.sizes[size]]))
    }
    function decrementSmallPizza(){
        // if(cartData.small==1) dispatch(deleteEntry([pizzaData._id,"small"]))
         return dispatch(cartDecrement([pizzaData._id,size,pizzaData.sizes[size]]))
    }
    function deleteCartEntery(){
        
        dispatch(deleteEntry([pizzaData._id,size,pizzaData.sizes[size]*quantity]))
    }
  return (
    
        (quantity>0) ? <div className="card border-0  flex-row  justify-content-center container p-0 mb-2 rounded mx-auto col col-md-8 col-sm-10" >
                
       

       <div class="card mb-3" style={{width: "50rem"}}>
            <div class="row no-gutters">
                <div class="col-sm-4 col-md-4">
                    <img class="card-img" src={pizzaData.image} alt={pizzaData.name} />
                </div>
                <div class="col-sm-6">
                    
                    <div class="card-body py-0">
                        <div className="display-flex-row-container">
                        <div>
                        <h5 class="card-title mb-0">{pizzaData.name}</h5>
                        <p class="card-text mb-0">{size}</p>
                        </div>
                       <div>
                       {pizzaData.vegetarian ? (
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
                        </div>
                        
                        <div className="col col-sm-6 text-center">
                            <button className="btn btn-primary btn-sm incremental-button-style" 
                            onClick={decrementSmallPizza} >-</button>
                            <p className='paragraph-style'>  {quantity}</p>
                            <button className="btn btn-primary btn-sm incremental-button-style" 
                            onClick={incrementSmallPizza}
                            >+</button>
                               </div>
                               
                       
                    </div>
                    
                    
                    
                </div>
                <div className="col-sm-2 col-md-2 text-center" >
                <h6 className="text-center">{pizzaData.sizes[size]*quantity}</h6>
                   <div>
                   <FontAwesomeIcon icon={faTrash}
                    onClick={deleteCartEntery}
                    data-toggle="tooltip" data-placement="bottom" title="Delete From Cart"
                    type='button' className='btn m-2 btn-warning wide-class' style={{color: "#000000"}} />  </div>  
                </div>
            </div>
        </div>
    </div> : null
    
  )
}
