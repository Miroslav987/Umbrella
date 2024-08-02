import { error } from "console";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { increment } from "firebase/firestore";
// import { fetchUsers } from "./ActionsCreators";b 

interface Userstate {
    email:string | null,
    id:string | null,
    token:string | null,
    img:string | undefined,
}

const initialState:Userstate={
    email:null,
    id:null,
    token:null,
    img:undefined
}

export const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        setUser(state ,action){
            state.email =action.payload.email;
            state.id =action.payload.uid;
            state.token =action.payload.accessToken;
            state.img =action.payload.photoURL;

        },
        removeUser(state){
            state.email = "";
            state.id = "";
            state.token = "";
        },
    },  
    //  extraReducers: {
    //     [fetchUsers.fulfilled.type]:(state:any ,action:PayloadAction<IUser[]>)=>{
    //         state.isLoading = false
    //         state.error = ""
    //         state.users = action.payload

    //     },
    //     [fetchUsers.pending.type]:(state:any ,action:PayloadAction<IUser[]>)=>{
    //         state.isLoading = true

    //     },
    //     [fetchUsers.rejected.type]:(state:any ,action:PayloadAction<IUser[]>)=>{
    //         state.isLoading = false
    //         state.error = action.payload

    //     },
    //  }
})

export const {setUser,removeUser}=userSlice.actions
export default userSlice.reducer