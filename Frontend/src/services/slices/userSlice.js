import { createSlice } from "@reduxjs/toolkit";

const userSlice=createSlice({
    name:"user",
    initialState:{
        loggedIn:false,
        userData:null
    },
    reducers:{
        login(state,action){
            state.loggedIn=true;
            state.userData=action.payload;
            console.log("loggein in now",state.userData)
        },
        logout(state,action){
            state.loggedIn=false
            state.userData=action.payload
        }

    }
})

export const {login,logout}=userSlice.actions
export default userSlice.reducer;