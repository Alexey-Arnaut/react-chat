import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { db } from '../../firebase'
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, doc, setDoc, Timestamp } from "firebase/firestore";

export const signInUser = createAsyncThunk(
    'auth/signInUser',
    async ({ email, password }: any, { dispatch }) => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                dispatch(signIn(user.uid))
            })
            .catch((error) => {
                const errorCode = error.code;
                console.log(errorCode);
            });
    }
)

export const signUpUser = createAsyncThunk(
    'auth/signUpUser',
    async ({ email, password, name, lastName, userAvatar }: any, { dispatch }) => {
        const auth = getAuth();
        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                dispatch(signIn(user.uid))

                addDoc(collection(db, "users"), {
                    fullName: lastName + ' ' + name,
                    createdAt: Timestamp.fromDate(new Date()),
                    uid: user.uid,
                    userAvatar,
                    email,
                    searchId: name + '#' + user.uid.slice(0, 5)
                });

                setDoc(doc(db, 'dialogs', user.uid), {
                    fullName: lastName + ' ' + name,
                    name: name,
                    userAvatar,
                    uid: user.uid,
                })
            })
            .catch((error) => {
                const errorCode = error.code;
                console.log(errorCode);
            });
    }
)

const authSlice = createSlice({
    name: 'authSlice',
    initialState: {
        uid: null,
        loading: false
    },
    reducers: {
        signIn(state, action) {
            state.uid = action.payload
        },
        signUp(state, action) {
            state.uid = action.payload
        }
    },
    extraReducers: {
        [signInUser.pending.type]: (state) => {
            state.loading = true
        },
        [signInUser.fulfilled.type]: (state) => {
            state.loading = false
        },
        [signUpUser.pending.type]: (state) => {
            state.loading = true
        },
        [signUpUser.fulfilled.type]: (state) => {
            state.loading = false
        },
    }
})

export const { signIn } = authSlice.actions
export default authSlice.reducer