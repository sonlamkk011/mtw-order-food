import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyA35gdA45Zr1qMAxJS0-q06iyik3tqk1vo",
    authDomain: "chat-app-path2.firebaseapp.com",
    projectId: "chat-app-path2",
    storageBucket: "chat-app-path2.appspot.com",
    messagingSenderId: "781990468414",
    appId: "1:781990468414:web:6449c1feffcf3248522a6f",
    measurementId: "G-2BHVV0GW4G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);