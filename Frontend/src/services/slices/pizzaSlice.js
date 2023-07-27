import { createApi,fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { normalizeDataToObj } from '../../utilities/normalizeData'
import { createSlice } from '@reduxjs/toolkit'


// let storeRef=null
// export const setStore=(store)=>{
//     storeRef=store
// }
//http://backendpizaa.onrender.com/
//http://localhost:8000/
// Define a service using a base URL and expected endpoints
export const pizzaApi = createApi({
  reducerPath: 'pizzaApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/' }),
  endpoints: (builder) => ({
    getAllPizza: builder.query({
      query: () => "pizza",
      transformResponse:(data)=>{
        const transformedData=normalizeDataToObj(data)
        
        return transformedData  }
    }),
  }),
})


 const pizzaSlice=createSlice({
    name:"pizzaSlice",
    initialState:{
        pizzas:null,
        vegPizzas:null,
    },
    reducers:{
        addAllPizzas:(state,action)=>{
            state.pizzas=action.payload
        }
    },
    extraReducers:(builder)=>{
        builder.addMatcher(pizzaApi.endpoints.getAllPizza.matchFulfilled,(state,action)=>{
            state.pizzas=action.payload
            // const vegetarianPizza=action.payload.reducer((acc,curr)=>{
            //   if(curr.vegetarian)acc.push(curr)
            // },[]);
            // state.vegPizzas=vegetarianPizza;
            // console.log(vegetarianPizza)

        })
    }
})


// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const {useGetAllPizzaQuery } = pizzaApi
export const { addAllPizzas } = pizzaSlice.actions;
export default pizzaSlice.reducer;


