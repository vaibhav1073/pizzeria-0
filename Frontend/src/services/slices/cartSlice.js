import { createSlice } from '@reduxjs/toolkit'



const cartSlice = createSlice({
  name: 'cart',
  initialState:{
    items:{},
    showAction:false,
    showAlertText:"Item added to Cart!",
    total:0
  },
  reducers: {
    increment(state, action) {
      const [itemId, size, quantity] = action.payload;
      state.total+=quantity

      if (state.items[itemId] && state.items[itemId][size]) {
        // If itemId and size already exist, increase the quantity by one
        state.showAlertText="Item updated! Check cart"
        state.items[itemId][size] += 1;
      } else {
        state.showAlertText="Item added to Cart !"
        // Otherwise, add a new entry for itemId with the specified size and quantity
        state.items[itemId] = {
          ...state.items[itemId],
          [size]: 1,
          
        };
      }

      state.showAction = true;
      console.log("something added");
    },
    decrement(state,action) {
      const [itemId, size, quantity] = action.payload;
      state.total-=quantity;
      if (state.items[itemId] && state.items[itemId][size]) {
        // If itemId and size already exist, increase the quantity by one
        state.showAlertText="Item updated! Check cart"
        console.log("decrement performed")
        if(state.items[itemId][size]!==0)state.items[itemId][size]-=1
        // state.items[itemId][size]-= state.items[itemId][size]===0 ? 0 :-quantity
        
      } else {
        state.showAlertText="Item added to Cart !"
        // Otherwise, add a new entry for itemId with the specified size and quantity
        state.items[itemId] = {
          ...state.items[itemId],
          [size]: 1,
        };
      }

      state.showAction = true;
      console.log("something added");
    },
    cartIncrement(state, action) {
      const [itemId, size, quantity] = action.payload;
      state.total+=quantity

      if (state.items[itemId] && state.items[itemId][size]) {
        // If itemId and size already exist, increase the quantity by one
        state.showAlertText="Item updated! Check cart"
        state.items[itemId][size] += 1;
      } else {
        state.showAlertText="Item added to Cart !"
        // Otherwise, add a new entry for itemId with the specified size and quantity
        state.items[itemId] = {
          ...state.items[itemId],
          [size]: 1,
        };
        
      }

    },
    setShowAction(state, action) {
      state.showAction = action.payload;
    },
    setShowAlertText(state,action){
      state.showAlertText=action.payload;
    },
    deleteEntry(state,action){
      const [itemId,size,quantity]=action.payload;
      delete state.items[itemId][size]
      state.total-=quantity;
    },
    cartDecrement(state,action) {
      const [itemId, size, quantity] = action.payload;
      state.total-=quantity;
      if (state.items[itemId] && state.items[itemId][size]) {
        // If itemId and size already exist, increase the quantity by one
        state.showAlertText="Item updated! Check cart"
        
        if(state.items[itemId][size]===1) deleteEntry([itemId,size])
        if(state.items[itemId][size]!==0)state.items[itemId][size]-=1
        // if(state.items[itemId][size]==0){delete state.items[itemId][size]}
        
        // state.items[itemId][size]-= state.items[itemId][size]===0 ? 0 :-quantity
        
      } else {
        state.showAlertText="Item added to Cart !"
        // Otherwise, add a new entry for itemId with the specified size and quantity
        // state.items[itemId] = {
        //   ...state.items[itemId],
        //   [size]: 1,
        // };
        
        delete state.items[itemId][size]
      }
    }
    
  },
})

export const { increment, decrement,setShowAction,cartIncrement,cartDecrement,deleteEntry,setShowAlertText } = cartSlice.actions
export default cartSlice.reducer