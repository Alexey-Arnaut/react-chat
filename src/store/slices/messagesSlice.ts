import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { db } from "../../firebase";
import { collection, onSnapshot, query, addDoc, Timestamp, doc, updateDoc, where, deleteDoc } from 'firebase/firestore';
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

        onSnapshot(query(collection(db, "messages"), where("commonId", "==", selectChat)), (querySnapshot) => {
            const data: IGetMessages[] = []

            querySnapshot.forEach((doc) => {
                const { createdAt, from, to, text, pictures } = doc.data()

                data.push({
                    from,
                    to,
                    text,
                    createdAt: createdAt.seconds,
                    id: doc.id,
                    pictures
                })
            });

            dispatch(messages(data))
        });

    }
)

export const sendMessage = createAsyncThunk(
    'messages/sendMessage',
    async ({ id, value, uid, pictures }: any) => {
        const selectChat = uid > id ? `${uid + id}` : `${id + uid}`

        await addDoc(collection(db, 'messages'), {
            text: value,
            from: uid,
            to: id,
            createdAt: Timestamp.fromDate(new Date()),
            pictures: pictures,
            commonId: selectChat
        })

        await updateDoc(doc(db, 'chat', uid + id), {
            text: value,
            createdAt: Timestamp.fromDate(new Date()),
            pictures: pictures,
        })

        await updateDoc(doc(db, 'chat', id + uid), {
            text: value,
            createdAt: Timestamp.fromDate(new Date()),
            pictures: pictures,
        })
    }
)

export const saveChangeMessage = createAsyncThunk(
    'messages/saveChangeMessage',

    async ({ value, id }: any) => {

        await updateDoc(doc(db, 'messages', id), {
            text: value,
        })
    }
)

export const deleteMessage = createAsyncThunk(
    'messages/deleteMessage',

    async (id: string) => {

        await deleteDoc(doc(db, "messages", id));
    }
)

const messagesSlice = createSlice({
    name: 'messages',
    initialState: {
        messages: [],
        selectMessage: ''
    },
    reducers: {
        messages(state, action) {
            state.messages = action.payload
        },
        selectMessage(state, action) {
            state.selectMessage = action.payload
        }
    }
})

const { messages } = messagesSlice.actions
export const { selectMessage } = messagesSlice.actions
export default messagesSlice.reducer