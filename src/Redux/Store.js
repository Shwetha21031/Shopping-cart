import { configureStore } from "@reduxjs/toolkit";
import ProductsSlice from "./ProductsSlice";
import loginSlice from "./loginSlice";

const store = configureStore({
    reducer:{
        products : ProductsSlice,
        login : loginSlice
    }   
})

export default store