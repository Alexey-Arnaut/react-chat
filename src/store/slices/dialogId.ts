import { createSlice } from "@reduxjs/toolkit";

const dialogId = createSlice({
    name: 'selectedDialogSlice',
    initialState: {
        id: null
    },
    reducers: {
        selectedDialog(state, action) {
            state.id = action.payload
        }
    }
})

export const { selectedDialog } = dialogId.actions
export default dialogId.reducer