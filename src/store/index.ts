import { configureStore } from "@reduxjs/toolkit";

import messageReducer from './slices/messagesSlice'
import dialogIdReducer from './slices/dialogIdSlice'
import authReducer from './slices/authSlice'

export const store = configureStore({
    reducer: {
        messages: messageReducer,
        dialogId: dialogIdReducer,
        auth: authReducer,
    }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>