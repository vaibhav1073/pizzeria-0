import React,{lazy,Suspense} from "react";
import { Route, Routes } from "react-router";
import { Navigate,BrowserRouter } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
// import Login from "./Login/Login"
// import Login from "./Login/Login";
// import Cart from "./Cart/Cart";

// import Signin from "./Signin/Signin";
import AdminTable from "./AdminTable/AdminTable";

import ShowAllPizza from "./PizzaHomePage/ShowAllPizza";
import { useSelector,useDispatch } from "react-redux";
import AlertOnAction from "./Alert/AlertOnAction";
import { UserDetails } from "./User/UserDetails";
import "./App.css"
import NewNavBar from "./Navbar/NewNavBar";
import { login } from "./services/slices/userSlice";
import { getUserData } from "./utilities/getUserDataJWT";



const Signin=lazy(()=>import("./Signin/Signin"))
const Cart = React.lazy(() => import ( "./Cart/Cart"));
const Login= lazy(()=>import("./Login/Login"))
function LazyComponent({ component: Component, ...rest }) {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Component {...rest} />
    </Suspense>
  );
}
function ProtectedRoute({ component: Component, path }){
  
  const isLoggedIn=useSelector((state)=>state.user.loggedIn)
  
  return isLoggedIn ? 
  <LazyComponent component={Component} />
   : 
    <Navigate to="/signin" replace />

}
function App() {
  const dispatch=useDispatch();
  const setUserData = async () =>{
    if(localStorage.getItem("token")){
      const data= await getUserData(localStorage.getItem("token"))
      dispatch(login(data))
    }
  }
  setUserData()
  const showAction=useSelector((state)=>state.cart.showAction)
  const text=useSelector((state)=>state.cart.showAlertText)
  return (
    
    <div
    >
      {showAction ? <div className="app-wrapper"><AlertOnAction  text={text}/></div> : <></>}
      
        
          <BrowserRouter>
            {/* <Navbar /> */}
            <NewNavBar />
           
            <div className="container" style={{width:"100%"}}> 
            <Routes>
            
              <Route path="/login" element={<LazyComponent component={Login} />} />
              <Route path="/signin" element={<LazyComponent component={Signin} />}/>
              <Route path="/" element={<ShowAllPizza />} />
              {/* <Route path="/cart" element={< LazyComponent  component={Cart}/>} /> */}
              <Route path="/cart/" element={<ProtectedRoute component={Cart} />} />
              <Route path="/admin" element={<AdminTable />} />
              <Route path="/user" element={<UserDetails />} />
            </Routes>
            </div>
          </BrowserRouter>
          
        

        
     
    </div>
  );
}
//<Route path="/cart" element={<Cart  />} />
export default App;
