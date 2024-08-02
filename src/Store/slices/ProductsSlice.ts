import { createSlice } from "@reduxjs/toolkit";



 export interface ProductsState {
    products:[{
        name:string,
        price:number,
        description:string,
        id:string,
        user:string,
        img1:string,
        img2:string,
        img3:string
    }],

    product:{
        name:string,
        price:number,
        description:string,
        id:string,
        user:string,
        img1:string,
        img2:string,
        img3:string,
        nameImg1:string,
        nameImg2:string,
        nameImg3:string,
    },
    isLoading: boolean,

}

const initialState:ProductsState = {
    products:[{
        name:"",
        price:0,
        description:"",
        id:"",
        user:"",
        img1:"",
        img2:"",
        img3:"",
    }],

    product:{
        name:"",
        price:0,
        description:"",
        id:"",
        user:"",
        img1:"",
        img2:"",
        img3:"",
        nameImg1:"",
        nameImg2:"",
        nameImg3:""
    },
    isLoading:false,

}

export const productsSlice = createSlice({
    name:"products",
    initialState,
    reducers:{
        SetProducts(state,action){
            state.products = action.payload
            state.isLoading = true
        },
        SetOneProducts(state,action){
            state.product.name = action.payload.name
            state.product.price = action.payload.price
            state.product.description = action.payload.description
            state.product.id = action.payload.id
            state.product.user = action.payload.user
            state.product.img1 = action.payload.img1
            state.product.img2 = action.payload.img2
            state.product.img3 = action.payload.img3
            state.product.nameImg1 = action.payload.nameImg1
            state.product.nameImg2 = action.payload.nameImg2
            state.product.nameImg3 = action.payload.nameImg3
            state.isLoading = true
        },
        LoadingProducts(state,action){
            state.isLoading = false
        }
    }
})



export const {SetProducts,SetOneProducts,LoadingProducts} = productsSlice.actions
export default productsSlice.reducer