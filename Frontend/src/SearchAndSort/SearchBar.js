// import React from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { filterByVeg,sortData } from '../services/slices/sortFilterSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faToggleOff,faToggleOn } from '@fortawesome/free-solid-svg-icons';
import InputSearchBar from './InputSearchBar';
import "./SearchBar.css"
import ToppingsDropdown from './ToppingsDropdown';

export default function SearchBar() {
  const dispatch=useDispatch()
  const veg=useSelector(state=>state.sortFilter.filterVeg)
  function changeFilter(e){
    if(e.target.value)dispatch(sortData([true,e.target.value]));
    else dispatch(sortData([false,null]))
  }
  return (
    
    <div className="container  mt-2 mb-3  mx-auto flex-start">
      <div className="container">
        <InputSearchBar />
      </div>
    <div className='display-flex-container-row'>
    <div className="blockone ">
    <label className="form-check-label pr-2" >Vegetarian</label>
    {
      veg?
      <FontAwesomeIcon icon={faToggleOn} 
      onClick={()=>dispatch(filterByVeg())}
    className='icon text-success'
      />
      :
      <FontAwesomeIcon icon={faToggleOff}  onClick={()=>dispatch(filterByVeg())}
    className='icon text-dark'
    />
    }
    </div>

<div className="container blocktwo" >
      <select name="" id="" onChange={(e)=>changeFilter(e)} className=' form-select  mx-auto'>
        <option value={null}>Sort By</option>
        <option value="a-b">Price lowest to highest</option>
        <option value="b-a">Price highest to Lowest</option>
      </select>
    </div>
   <div className="blockthree">
   <ToppingsDropdown />
   </div>
    </div>
    
    
    </div>
    
  )
}
