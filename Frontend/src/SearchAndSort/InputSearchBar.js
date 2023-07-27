import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./InputSearchBar.css"
import { faSearch,faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchPrompt } from "../services/slices/sortFilterSlice";


function InputSearchBar() {
    const dispatch=useDispatch()
    const [text,setText]=useState("");
    function textHandler(){
        if(text!==""){
            setText("")
            dispatch(searchPrompt(""))
        }
    }
    function handleEnterKey(event){
        if(event.key==="Enter" && text!=="")dispatch(searchPrompt(text))
        if(text==="")dispatch(searchPrompt(text))

    }
  return (
    <div className="container">

            <div className="row height d-flex justify-content-center align-items-center mb-4 mt-2">

              <div className="col-md-8">

                <div className="form">
                <FontAwesomeIcon icon={faSearch} className="fa-search pr-2" />
                  
                  <input type="text" className="form-control form-input" placeholder="Search delicousness..."
                  value={text} onChange={(e)=>setText(e.target.value)} onKeyDown={handleEnterKey}
                  />
                  {text ? <span className="left-pan">
                  <FontAwesomeIcon icon={faXmark} className=" fa fa-microphone" onClick={textHandler} />
                    
                    </span> : <></>}
                </div>
                
              </div>
              
            </div>
            
          </div>
  );
}

export default InputSearchBar;
