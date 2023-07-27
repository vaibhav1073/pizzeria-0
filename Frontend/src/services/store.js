import { configureStore } from '@reduxjs/toolkit'


import cartSlice from './slices/cartSlice'
import pizzaSlice,{ pizzaApi} from './slices/pizzaSlice';

import { setupListeners } from '@reduxjs/toolkit/dist/query'; // Correct import path
import sortFilterSlice from './slices/sortFilterSlice';
import userSlice from './slices/userSlice';

const store = configureStore({
     reducer: {
        cart:cartSlice,
        pizza:pizzaSlice,
        sortFilter:sortFilterSlice,
        user:userSlice,
        [pizzaApi.reducerPath]:pizzaApi.reducer
     },
     middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(pizzaApi.middleware)
    })
// The store now has redux-thunk added and the Redux DevTools Extension is turned on

// updateReducer.setStore(store);
setupListeners(store.dispatch)
export default store;