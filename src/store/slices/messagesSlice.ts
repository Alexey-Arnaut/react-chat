import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { db } from "../../firebase";
import { collection, onSnapshot, orderBy, query, addDoc, Timestamp } from 'firebase/firestore';

interface IGetMessages {
    from: string,
    to: string,
    text: string,
    createdAt: number,
    id: string,
}

export const getMessages = createAsyncThunk(
    'messages/getMessages',
    async (id: string, { dispatch }) => {
        const msgsRef = collection(db, 'messages', id, 'chat')

        onSnapshot(query(msgsRef, orderBy('createdAt', 'asc')), querySnapshot => {
            const data: IGetMessages[] = []

            querySnapshot.forEach(doc => {
                const { createdAt, from, to, text } = doc.data()

                data.push({
                    from: from,
                    to: to,
                    text: text,
                    createdAt: createdAt.seconds,
                    id: doc.id
                })
            })
            dispatch(messages(data))
        })
    }
)

export const sendMessage = createAsyncThunk(
    'messages/sendMessage',
    async ({ id, value, uid }: any) => {
        await addDoc(collection(db, 'messages', id, 'chat'), {
            text: value,
            from: uid,
            to: id,
            createdAt: Timestamp.fromDate(new Date())
        })
    }
)

const messagesSlice = createSlice({
    name: 'messages',
    initialState: {
        messages: []
    },
    reducers: {
        messages(state, action) {
            state.messages = action.payload
        }
    }
})

const { messages } = messagesSlice.actions
export default messagesSlice.reducer