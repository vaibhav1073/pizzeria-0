import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { NavLink, useNavigate } from "react-router-dom"
import { faPizzaSlice,faCartShopping } from "@fortawesome/free-solid-svg-icons"
import { useSelector,useDispatch } from "react-redux"
import { logout } from "../services/slices/userSlice"
import "./Navbar.css"



function NewNavBar() {
    const isLoggedIn=useSelector((state)=>state.user.loggedIn)
  const name=useSelector((state)=>state.user?.userData?.firstName)
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const logOutHandler = () => {
    navigate('/')
    localStorage.removeItem("token")
    dispatch(logout(null))
  }
  return (
   
    <nav className="navbar navbar-expand-lg bg-body-warning bg-warning">
  <div className="container-fluid">
   <h3> 
    <NavLink  to="/" className="navbar-brand brand-icon-font">
    <FontAwesomeIcon icon={faPizzaSlice} className="fa-pizza" />
        Pizzerio
        </NavLink>
    </h3>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    {isLoggedIn ? <>
        <div className="collapse navbar-collapse text-center" id="navbarNavAltMarkup">
          <div className="navbar-nav  ms-auto">
            <NavLink className="nav-link nav-item " to="/cart"><FontAwesomeIcon icon={faCartShopping} /></NavLink>
            <NavLink className="nav-link nav-item  " to="/user">{name}</NavLink>
            <NavLink className="nav-link  nav-item" onClick={logOutHandler} to="/" >Logout</NavLink>
          
            
          </div>
        </div>
    </> :
    <>
     <div className="collapse navbar-collapse text-center" id="navbarNavAltMarkup">
      <div className="navbar-nav  ms-auto">
        <NavLink className="nav-link nav-item " to="/login">Register</NavLink>
        <NavLink className="nav-link  nav-item" aria-current="page" to="/signin" >Login</NavLink>
       
        
      </div>
    </div>
    </>}
   
  </div>
</nav>

   

  )
}


export default NewNavBar;
