import { createSlice } from "@reduxjs/toolkit";

const dialogIdSlice = createSlice({
    name: 'dialogIdSlice',
    initialState: {
        id: null
    },
    reducers: {
        selectedDialog(state, action) {
            state.id = action.payload
        }
    }
})

export const { selectedDialog } = dialogIdSlice.actions
export default dialogIdSlice.reducer