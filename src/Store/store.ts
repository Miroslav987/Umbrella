import { configureStore } from "@reduxjs/toolkit";
import userReducer  from "./slices/UserSlice";
import productsReducer  from "./slices/ProductsSlice";
import { combineReducers } from "redux";


const rootReducer =combineReducers({
    userReducer,
    productsReducer,
})

export const setupStore =()=> {
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState =ReturnType<typeof rootReducer>
export type AppStore =ReturnType<typeof setupStore>
export type AppDispatch =AppStore['dispatch']

