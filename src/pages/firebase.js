import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyDcCpX_wPxrP5XtV-lTLh4Og1YZuR0p02Q",
    authDomain: "phone-auth-6930d.firebaseapp.com",
    projectId: "phone-auth-6930d",
    storageBucket: "phone-auth-6930d.appspot.com",
    messagingSenderId: "880536493880",
    appId: "1:880536493880:web:eed6a7c16e8bbb0461abcd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);