import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../firebase";
import { collection, query, where, getDocs, onSnapshot, doc, setDoc, Timestamp } from "firebase/firestore";

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

    async ({ userInfo, meInfo, uid, id, value, pictures }: any) => {

        // me
        await setDoc(doc(db, "chat", uid + id), {
            uid: uid,
            friend: id,
            userAvatar: userInfo.userAvatar,
            value,
            pictures,
            commonId: uid + id,
            createdAt: Timestamp.fromDate(new Date()),
            fullName: userInfo.fullName
        });

        //friend
        await setDoc(doc(db, 'chat', id + uid), {
            uid: id,
            friend: uid,
            userAvatar: meInfo.userAvatar,
            value,
            pictures,
            commonId: id + uid,
            createdAt: Timestamp.fromDate(new Date()),
            fullName: meInfo.fullName
        })
    }
)

export const resultUserSearch = createAsyncThunk(
    'user/resultUserSearch',

    async (value: string, { dispatch }) => {

        onSnapshot(query(collection(db, "users"), where("searchId", "==", value)), (querySnapshot) => {
            const data: any = []

            querySnapshot.forEach((doc) => {
                const { fullName, userAvatar, uid, searchId } = doc.data()

                data.push({
                    fullName,
                    userAvatar,
                    uid,
                    searchId,
                })
            });

            dispatch(foundUser(data))
        });
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState: {
        userInfo: [],
        meInfo: [],
        foundUser: []
    },
    reducers: {
        userInfo(state, action) {
            state.userInfo = action.payload
        },
        meInfo(state, action) {
            state.meInfo = action.payload
        },
        foundUser(state, action) {
            state.foundUser = action.payload
        },
    }
})

export const { userInfo, meInfo, foundUser } = userSlice.actions
export default userSlice.reducer