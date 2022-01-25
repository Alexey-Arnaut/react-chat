import { configureStore } from "@reduxjs/toolkit";
import messageReducer from './slices/messagesSlice'
import dialogIdReducer from './slices/dialogId'

export const store = configureStore({
    reducer: {
        messages: messageReducer,
        dialogId: dialogIdReducer
    }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>