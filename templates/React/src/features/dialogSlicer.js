import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    state:false,

};





export const DialogSlice = createSlice({
    name: 'Company',
    initialState,
    reducers:{
        dialogState:(state)=>
        {
            state.state= !state.state
        }
    }
})




export const selectState = (state) => state.Dialog.state;

export default DialogSlice.reducer;

