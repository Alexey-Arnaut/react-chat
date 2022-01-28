import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../firebase";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";

export const getUserInfo = createAsyncThunk(
    'user/getUserInfo',

    async (id: string, { dispatch }) => {
        const userRef = query(collection(db, "users"), where("uid", "==", id));

        const querySnapshot = await getDocs(userRef);
        querySnapshot.forEach((doc) => {
            console.log();
            dispatch(userInfo({
                ...doc.data(),
                createdAt: doc.data().createdAt.seconds
            }))
        });
    }
)

export const getMeInfo = createAsyncThunk(
    'user/getMeInfo',

    async (uid: string, { dispatch }) => {

        const userRef = query(collection(db, "users"), where("uid", "==", uid));

        const querySnapshot = await getDocs(userRef);
        querySnapshot.forEach((doc) => {

            dispatch(meInfo({
                ...doc.data(),
                createdAt: doc.data().createdAt.seconds
            }))
        });
    }
)

export const userFriends = createAsyncThunk(
    'user/userFriends',

    async ({ userInfo, meInfo, uid, id }: any) => {
        await addDoc(collection(db, 'friends', uid, 'friends'), {
            createdAt: userInfo.createdAt,
            fullName: userInfo.fullName,
            id: userInfo.uid,
            text: '',
            userAvatar: userInfo.userAvatar
        })

        await addDoc(collection(db, 'friends', id, 'friends'), {
            createdAt: meInfo.createdAt,
            fullName: meInfo.fullName,
            id: meInfo.uid,
            text: '',
            userAvatar: meInfo.userAvatar
        })
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState: {
        userInfo: [],
        meInfo: []
    },
    reducers: {
        userInfo(state, action) {
            state.userInfo = action.payload
        },
        meInfo(state, action) {
            state.meInfo = action.payload
        }
    }
})

export const { userInfo, meInfo } = userSlice.actions
export default userSlice.reducer