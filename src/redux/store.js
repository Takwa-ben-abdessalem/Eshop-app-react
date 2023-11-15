import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice"
import productSlice from "./slice/productSlice";
import filterReducer from "./slice/filterSlice"
import cartReducer from "./slice/cartSlice";
import checkoutReducer from "./slice/checkoutSlice"

const rootReducer = combineReducers({
    auth: authReducer,
    product: productSlice,
    filter: filterReducer,
    cart: cartReducer,
    checkout : checkoutReducer
   
  });

  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
     
      serializableCheck: false,
    }),
      })

      export default store;
