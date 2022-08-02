import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    totalPrice: 0,
    items: []
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action) {
            const findItem = state.items.find(obj => obj.id === action.payload.id)
            if (findItem) {
                findItem.count++;
            } else {
                state.items.push({
                    ...action.payload,
                    count: 1
                })
            }

            state.totalPrice = state.items.reduce((sum, obj) => {
                return (obj.price * obj.count) + sum;
            }, 0)
        },
        minusItem(state, action) {
            const findItem = state.items.find(obj => obj.id === action.payload)
            if (findItem.count >= 2) {
                findItem.count--;
            }

            state.totalPrice = state.items.reduce((sum, obj) => {
                return (obj.price * obj.count) + sum;
            }, 0)
        },
        removeItem(state, action) {
            state.items = state.items.filter(obj => obj.id !== action.payload.id);

            state.totalPrice = state.totalPrice - action.payload.price * action.payload.count;
        },
        clearItem(state) {
            state.items = [];
            state.totalPrice = 0;
        },
    }
})

export const selectCart = (state) => state.cart

export const {addItem, minusItem, removeItem, clearItem} = cartSlice.actions;
export const selectCartItemById = (id) => (state) => state.cart.items.find(obj => obj.id === id)

export default cartSlice.reducer;