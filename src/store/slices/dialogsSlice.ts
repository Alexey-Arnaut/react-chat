import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { db } from "../../firebase";
import { collection, onSnapshot, query, where } from 'firebase/firestore';

import { IGetDialogs } from '../inteface'

export const getDialogs = createAsyncThunk(
    'dialogs/getDialogs',
    async (uid: string, { dispatch }) => {

        try {
            onSnapshot(query(collection(db, "chat"), where("uid", "==", uid)), (querySnapshot) => {
                const data: IGetDialogs[] = []

                querySnapshot.forEach((doc) => {
                    const { audio, createdAt, friend, fullName, pictures, text, uid, userAvatar } = doc.data()

                    data.push({
                        audio,
                        createdAt: createdAt.seconds,
                        friend,
                        fullName,
                        pictures,
                        text,
                        uid,
                        userAvatar,
                    })
                });

                dispatch(dialogs(data))
            });
        } catch (error) {
            console.log(error);
        }
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