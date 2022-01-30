import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { db } from "../../firebase";
import { collection, onSnapshot, query, where } from 'firebase/firestore';

export const getDialogs = createAsyncThunk(
    'dialogs/getDialogs',
    async (uid: string, { dispatch }) => {

        onSnapshot(query(collection(db, "chat"), where("uid", "==", uid)), (querySnapshot) => {
            const data: any = []

            querySnapshot.forEach((doc) => {
                data.push({
                    ...doc.data(),
                    createdAt: doc.data().createdAt.seconds
                })
            });

            dispatch(dialogs(data))
        });
    }
)

const dialigSLice = createSlice({
    name: 'dialogs',
    initialState: {
        dialogs: [],
    },
    reducers: {
        dialogs(state, action) {
            state.dialogs = action.payload
        },
    }
})

const { dialogs } = dialigSLice.actions
export default dialigSLice.reducer