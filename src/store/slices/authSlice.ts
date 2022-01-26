import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { db } from '../../firebase'
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, Timestamp } from "firebase/firestore";

export const signInUser = createAsyncThunk(
    'auth/signInUser',
    async ({ email, password }: any, { dispatch }) => {
        console.log(email, password);

        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                dispatch(signIn(user.uid))
            })
            .catch((error) => {
                const errorCode = error.code;
            });
    }
)

export const signUpUser = createAsyncThunk(
    'auth/signUpUser',
    async ({ email, password, name, lastName }: any, { dispatch }) => {
        const auth = getAuth();
        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                dispatch(signIn(user.uid))
            })
            .catch((error) => {
                const errorCode = error.code;
                console.log(errorCode);
            });

        await addDoc(collection(db, "users"), {
            fullName: lastName + ' ' + name,
            createdAt: Timestamp.fromDate(new Date()),
        });
    }
)

const authSlice = createSlice({
    name: 'authSlice',
    initialState: {
        uid: null,
    },
    reducers: {
        signIn(state, action) {
            state.uid = action.payload
        },
        signUp(state, action) {
            state.uid = action.payload
        }
    }
})

export const { signIn } = authSlice.actions
export default authSlice.reducer