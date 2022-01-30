import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { db } from "../../firebase";
import { collection, onSnapshot, orderBy, query, addDoc, Timestamp, setDoc, doc, updateDoc, where } from 'firebase/firestore';
interface IGetMessages {
    from: string,
    to: string,
    text: string,
    createdAt: number,
    id: string,
    pictures: string
}

export const getMessages = createAsyncThunk(
    'messages/getMessages',
    async ({ id, uid }: any, { dispatch }) => {
        const selectChat = uid > id ? `${uid + id}` : `${id + uid}`

        onSnapshot(query(collection(db, 'messages', selectChat, 'chat'), orderBy('createdAt', 'asc')), querySnapshot => {
            const data: IGetMessages[] = []

            querySnapshot.forEach(doc => {
                const { createdAt, from, to, text, pictures } = doc.data()

                data.push({
                    from,
                    to,
                    text,
                    createdAt: createdAt.seconds,
                    id: doc.id,
                    pictures
                })
            })
            dispatch(messages(data))
        })

    }
)

export const sendMessage = createAsyncThunk(
    'messages/sendMessage',
    async ({ id, value, uid, pictures }: any) => {
        const selectChat = uid > id ? `${uid + id}` : `${id + uid}`

        await addDoc(collection(db, 'messages', selectChat, 'chat'), {
            text: value,
            from: uid,
            to: id,
            createdAt: Timestamp.fromDate(new Date()),
            pictures: pictures
        })

        await updateDoc(doc(db, 'chat', uid + id), {
            text: value,
            createdAt: Timestamp.fromDate(new Date()),
            pictures: pictures
        })

        await updateDoc(doc(db, 'chat', id + uid), {
            text: value,
            createdAt: Timestamp.fromDate(new Date()),
            pictures: pictures
        })
    }
)

const messagesSlice = createSlice({
    name: 'messages',
    initialState: {
        messages: [],
    },
    reducers: {
        messages(state, action) {
            state.messages = action.payload
        }
    }
})

const { messages } = messagesSlice.actions
export default messagesSlice.reducer