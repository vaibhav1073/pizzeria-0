import { createSlice } from "@reduxjs/toolkit";

const sortFilterSlice=createSlice({
    name:"sortFilter",
    initialState:{
        filterVeg:false,
        sortByPrice:[false,null],
        searchByPrompt:"",
        searchByToppings:[]
    },
    reducers:{
        filterByVeg(state){
            state.filterVeg=!state.filterVeg
        },
        sortData(state,action){
            state.sortByPrice=action.payload;
            console.log(state.sortByPrice)
        },
        searchPrompt(state,action){
            state.searchByPrompt=action.payload;
            
        },
       insertTopping(state,action){
        let newTopping=action.payload;
        if(!state.searchByToppings.includes(newTopping))state.searchByToppings.push(newTopping)
        
       },
       deleteTopping(state,action){
        let topping=action.payload;
        state.searchByToppings=state.searchByToppings.filter(item=> item!==topping)
        
       }
    }
})
export const {filterByVeg,sortData,searchPrompt,insertTopping,deleteTopping}=sortFilterSlice.actions
export default sortFilterSlice.reducer