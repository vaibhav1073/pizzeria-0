import { useSelector } from 'react-redux'
import CartCard from './CartCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPizzaSlice,faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { processCart } from '../utilities/processCart';



export default function CartFilled({cart}) {
    const fullData=useSelector((state)=>state.pizza.pizzas)
    const total=useSelector((state)=>state.cart.total);
    const navigate=useNavigate();
    function buyMoreClickHandler(){
      navigate("/")
    }
    
    const renderElements = (cart) => {
        return Object.entries(cart).map(([objectKey, properties]) => {
          return Object.entries(properties).map(([propertyKey, value]) => {
            const uniqueKey = `${objectKey}${propertyKey}`;
            return <CartCard key={uniqueKey}
            pizzaData={fullData.dataObj[objectKey]} size={propertyKey} quantity={value}
             />
         });
        });
      };
return (
<>
<h2 className="container text-center mt-3">Welcome To Cart</h2>
<div className='mt-3'>{renderElements(cart)}</div>

<div className="d-flex justify-content-between container  col col-md-5 col-sm-10 mt-3">
  <h3>Total</h3>
  <h3 style={{marginRight:"03rem"}}>
  {total}
  </h3>
</div>
<div className="container d-flex justify-content-between col col-md-6 mt-2">
<button className="btn btn-warning"
onClick={buyMoreClickHandler}>Buy more <FontAwesomeIcon icon={faPizzaSlice} /></button>
<button className="btn btn-warning"
onClick={()=>processCart(total)}>Checkout <FontAwesomeIcon icon={faShoppingBag}  /></button>
</div>
</>
)
}

