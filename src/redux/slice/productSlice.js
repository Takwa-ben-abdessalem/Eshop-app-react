import { createSlice } from '@reduxjs/toolkit'
//rxslice
const initialState = {

   products: [],
   minPrice:null,
   maxPrice:null

}

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    GET_PRODUCT: (state, action) => {
        console.log(action.payload)
        state.products = action.payload.products

    },

    GET_PRICE_RANGE(state,action) {
         const{products} = action.payload
         const array = []
         products.map((product) => {
          const price = product.price
          return array.push(price)
         });
         const max = Math.max(...array)
         const min = Math.min(...array)

         state.minPrice = min
         state.maxPrice = max
    },
    
   
  }
});

export const {GET_PRODUCT,GET_PRICE_RANGE} = productSlice.actions

// export const selectname = (state) => state.product.name;
// export const selectimageURL = (state) => state.product.imageURL
// export const selectprice = (state) => state.product.price
// export const selectcategory = (state) => state.product.category
// export const selectbrand = (state) => state.product.brand
// export const selectdesc = (state) => state.product.desc
export const selectProducts = (state) => state.product.products
export const selectMinPrice = (state) => state.product.minPrice
export const selectMaxPrice = (state) => state.product.maxPrice

export default productSlice.reducer