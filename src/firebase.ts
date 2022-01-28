import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage'

const firebaseApp = initializeApp({
    apiKey: "AIzaSyBybgju4Hwdqn2zNZbTSxONqVOtnewmzgM",
    authDomain: "imessenger-402c6.firebaseapp.com",
    projectId: "imessenger-402c6",
    storageBucket: "imessenger-402c6.appspot.com",
    messagingSenderId: "32516792901",
    appId: "1:32516792901:web:5b5a2f81a004acee24392c"
});

export const db = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp)