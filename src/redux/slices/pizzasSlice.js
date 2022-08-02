import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
    'pizzas/fetchPizzasStatus', // Создаем название только для себя, на функционал никак не влияет и не используется
    async (params, thunkAPI) => {
        const {category, sortBy, order, search, currentPage} = params;
        const {data} = await axios.get(`https://62b80cc9f4cb8d63df57e196.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
        return data
    }
) // Санка чтобы несколько действий делать в одной функции и использовать эту функцию в нескольких местах в приложении

const initialState = {
    items: [],
    status: 'loading' // статусы: loading | success | error
}

const pizzasSlice = createSlice({
    name: 'pizzas',
    initialState,
    reducers: {
        setItems(state, action) {
            state.items = action.payload;
        }
    },
    extraReducers: {
        [fetchPizzas.pending]: (state) => {
            state.items = []
            state.status = 'loading'
        }, // Если будет запрос, произойдут такие дейсвтия
        [fetchPizzas.fulfilled]: (state, action) => {
            state.items = action.payload
            state.status = 'success'
        }, // Если будет успех, произойдут такие дейсвтия
        [fetchPizzas.rejected]: (state) => {
            state.status = 'error'
            state.items = []
        } // Если будет ошибка, произойдут такие дейсвтия
    },
})

export const selectPizzaData = (state) => state.pizzas;

export const {setItems} = pizzasSlice.actions;

export default pizzasSlice.reducer;