import { createSlice } from '@reduxjs/toolkit'
//rxslice
const initialState = {
  //  name: "",
  //  imageURL:"",
  //  price: null,
   // category: "",
   // brand: "",
   // desc: "",
   products: [],

}

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    GET_PRODUCT: (state, action) => {
        console.log(action.payload)
        state.products = action.payload.products

        // const {name, imageURL, price,category,brand,desc} = action.payload
        // state.name = name;
        // state.imageURL = imageURL
        // state.price = price
        // state.category = category
        // state.brand = brand
        // state.desc = desc

     //   console.log(state.name)

    },
   
  }
});

export const {GET_PRODUCT} = productSlice.actions

// export const selectname = (state) => state.product.name;
// export const selectimageURL = (state) => state.product.imageURL
// export const selectprice = (state) => state.product.price
// export const selectcategory = (state) => state.product.category
// export const selectbrand = (state) => state.product.brand
// export const selectdesc = (state) => state.product.desc
export const selectProducts = (state) => state.product.products

export default productSlice.reducer