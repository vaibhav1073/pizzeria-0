import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useSelector } from "react-redux"
import { faAt,faPhone } from "@fortawesome/free-solid-svg-icons"
import "./UserDetails.css"



export const UserDetails = () => {
    const data=useSelector(state=>state.user.userData)
  return (
    <div className="container">
        Here the user details will be displayed
        
                    <div className="card" id="big-font" style={{width:"50rem"}}>
                    <div className="card-header">
                      {data.firstName + " " + data.lastName}
                    </div>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">
                      <FontAwesomeIcon icon={faAt}  className="icon" />{data.email}</li>
                      <li className="list-group-item">
                      <FontAwesomeIcon icon={faPhone}  className="icon"/>
                        {data.phone}</li>
                      
                    </ul>
                  </div>
                
               
            
        
    </div>
  )
}

// email
// : 
// "rashidAnime@gmail.com"
// firstName
// : 
// "ramshid"
// isAdmin
// : 
// false
// lastName
// : 
// "kun"
// password
// : 
// "$2b$08$Lo2.J9YvGQ9k.VHqt2QJt.PjzNBNnClpK460o2jghP/RQUpI4H.F."
// phone
// : 
// "7809653789"
// __v
// : 
// 0
// _id
// : 
// "64a27aba0a8f2a0c8290ab23"