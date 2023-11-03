import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice"
import productSlice from "./slice/productSlice";

const rootReducer = combineReducers({
    auth: authReducer,
    product: productSlice,
   
  });

  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
     
      serializableCheck: false,
    }),
      })

      export default store;
