import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { db } from "../../firebase";
import { collection, onSnapshot, query, addDoc, Timestamp, doc, updateDoc, where, deleteDoc } from 'firebase/firestore';

interface IAudioDuration {
    minutes: number,
    seconds: number,
}
interface IGetMessages {
    from: string,
    to: string,
    text: string,
    createdAt: number,
    id: string,
    pictures: string,
    audio: string,
    audioDuration: IAudioDuration | ''
}

export const getMessages = createAsyncThunk(
    'messages/getMessages',
    async ({ id, uid }: any, { dispatch }) => {
        const selectChat = uid > id ? `${uid + id}` : `${id + uid}`

        onSnapshot(query(collection(db, "messages"), where("commonId", "==", selectChat)), (querySnapshot) => {
            const data: IGetMessages[] = []

            querySnapshot.forEach((doc) => {
                const { createdAt, from, to, text, pictures, audio, audioDuration } = doc.data()

                data.push({
                    from,
                    to,
                    text,
                    createdAt: createdAt.seconds,
                    id: doc.id,
                    pictures,
                    audio,
                    audioDuration
                })
            });

            dispatch(messages(data))
        });

    }
)

export const sendMessage = createAsyncThunk(
    'messages/sendMessage',
    async ({ id, value, uid, pictures, audio, audioDuration }: any) => {
        const selectChat = uid > id ? `${uid + id}` : `${id + uid}`

        await addDoc(collection(db, 'messages'), {
            text: value,
            from: uid,
            to: id,
            createdAt: Timestamp.fromDate(new Date()),
            pictures,
            commonId: selectChat,
            audio,
            audioDuration
        })

        await updateDoc(doc(db, 'chat', uid + id), {
            text: value,
            createdAt: Timestamp.fromDate(new Date()),
            pictures,
            audio,
            audioDuration
        })

        await updateDoc(doc(db, 'chat', id + uid), {
            text: value,
            createdAt: Timestamp.fromDate(new Date()),
            pictures,
            audio,
            audioDuration
        })
    }
)

export const saveChangeMessage = createAsyncThunk(
    'messages/saveChangeMessage',

    async ({ value, messageId, id, uid, lastMessageId }: any) => {

        await updateDoc(doc(db, 'messages', messageId), {
            text: value,
        })

        if (messageId === lastMessageId) {
            await updateDoc(doc(db, 'chat', uid + id), {
                text: value,
            })

            await updateDoc(doc(db, 'chat', id + uid), {
                text: value,
            })
        }
    }
)

export const deleteMessage = createAsyncThunk(
    'messages/deleteMessage',

    async ({ value, messageId, id, uid, pictures, audio, createdAt }: any) => {

        await deleteDoc(doc(db, "messages", messageId));

        await updateDoc(doc(db, 'chat', uid + id), {
            text: value,
            pictures,
            audio,
            createdAt
        })

        await updateDoc(doc(db, 'chat', id + uid), {
            text: value,
            pictures,
            audio,
            createdAt
        })
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