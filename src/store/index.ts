import { configureStore } from "@reduxjs/toolkit";

import messageReducer from './slices/messagesSlice'
import dialogIdReducer from './slices/dialogIdSlice'
import authReducer from './slices/authSlice'
import dialogReducer from './slices/dialogsSlice'
import userReducer from './slices/userSlice'

export const store = configureStore({
    reducer: {
        messages: messageReducer,
        dialogId: dialogIdReducer,
        auth: authReducer,
        dialogs: dialogReducer,
        user: userReducer
    }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>