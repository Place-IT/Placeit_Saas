import {createSlice} from "@reduxjs/toolkit";
import {logdata} from "../CommonFunctions/Logger/Logevents";


const initialState = {
    state:false,

};





export const DialogSlice = createSlice({
    name: 'Dialog',
    initialState,
    reducers:{
        dialogState:(state)=>
        {
            logdata("Dialog_state_update","info",`Empty_feed_component props:${state.state}`)
            state.state= !state.state
        }
    }
})




export const selectState = (state) => state.Dialog.state;

export default DialogSlice.reducer;

