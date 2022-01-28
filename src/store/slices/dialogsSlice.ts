import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { db } from "../../firebase";
import { collection, onSnapshot, query } from 'firebase/firestore';

export const getDialogs = createAsyncThunk(
    'dialogs/getDialogs',
    async (uid: string, { dispatch }) => {
        onSnapshot(query(collection(db, 'friends', uid, 'friends')), querySnapshot => {
            const data: any = []

            querySnapshot.forEach(doc => {
                data.push({
                    ...doc.data(),
                })
            })

            dispatch(dialogs(data))
        })
    }
)

const dialigSLice = createSlice({
    name: 'dialogs',
    initialState: {
        dialogs: []
    },
    reducers: {
        dialogs(state, action) {
            state.dialogs = action.payload
        }
    }
})

const { dialogs } = dialigSLice.actions
export default dialigSLice.reducer