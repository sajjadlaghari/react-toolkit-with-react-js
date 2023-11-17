const { createSlice } = require('@reduxjs/toolkit');

const initialState = []; // 'initialState' instead of 'initialstate'

const cartSlice = createSlice({
    name: 'cart',
    initialState, // Correct reference to 'initialState'
    reducers: {
        add(state, action) {
            const productToAdd = action.payload;
            const existingProduct = state.find(item => item.id === productToAdd.id);
            if (!existingProduct) {
                state.push(productToAdd);
            } else {
                console.log('Product is already in the cart!');
            }
        },
        remove(state, action) { // Added 'state' parameter here
            return state.filter(item => item.id !== action.payload);
        }
    }
});
export const { add, remove } = cartSlice.actions;
export default cartSlice.reducer;
