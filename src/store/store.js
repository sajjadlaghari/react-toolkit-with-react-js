import { configureStore } from "@reduxjs/toolkit";

import cartreducer from './cartSlice'


const store = configureStore({
    reducer:{
        cart:cartreducer
    }
}) 

export default store