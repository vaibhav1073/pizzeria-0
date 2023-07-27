import axios from "axios"

export const getUserData=async (token)=>{
    try{
    const data = await axios.get("http://localhost:5050/getUserFromToken",{headers:{"Authorization":`Bearer ${token}`}})
    console.log(data)
    return data.data
    } catch(err) {
        console.log(err)
        
    }
}